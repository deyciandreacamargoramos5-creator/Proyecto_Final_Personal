from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/digital_wine_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    correo = db.Column(db.String(100), unique=True)
    telefono = db.Column(db.String(20))
    usuario = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))

class Pedido(db.Model):
    __tablename__ = 'pedidos'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    numero_pedido = db.Column(db.String(50))
    fecha = db.Column(db.Date, default=datetime.utcnow)
    total = db.Column(db.Float)

@app.route('/api/usuarios/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(correo=data['correo'], password=data['password']).first()
    if user:
        return jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "usuario": {
                "id": user.id,
                "nombre": user.nombre,
                "correo": user.correo,
                "usuario": user.usuario
            }
        }), 200
    return jsonify({"mensaje": "Correo o contraseña incorrectos"}), 401

@app.route('/api/pedidos/crear', methods=['POST'])
def crear_pedido():
    data = request.json
    try:
        nuevo_pedido = Pedido(
            usuario_id=data['usuario_id'],
            numero_pedido=data['numero_pedido'],
            total=data['total']
        )
        db.session.add(nuevo_pedido)
        db.session.commit()
        return jsonify({"mensaje": "Compra registrada con éxito", "id": nuevo_pedido.id}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error al insertar: {e}")
        return jsonify({"mensaje": "Error al registrar la compra"}), 500

@app.route('/api/pedidos/<int:usuario_id>', methods=['GET'])
def obtener_pedidos(usuario_id):
    try:
        pedidos_db = Pedido.query.filter_by(usuario_id=usuario_id).order_by(Pedido.id.desc()).all()
        lista_pedidos = []
        for p in pedidos_db:
            lista_pedidos.append({
                "id": p.id,
                "numero_pedido": p.numero_pedido,
                "fecha": p.fecha.isoformat() if p.fecha else "",
                "total": p.total
            })
        return jsonify(lista_pedidos), 200
    except Exception as e:
        return jsonify({"mensaje": "Error en el servidor"}), 500

@app.route('/api/usuarios/registro', methods=['POST'])
def registro():
    data = request.json
    try:
        nuevo = Usuario(
            nombre=data['nombre'], 
            correo=data['correo'], 
            telefono=data['telefono'], 
            usuario=data['usuario'], 
            password=data['password']
        )
        db.session.add(nuevo)
        db.session.commit()
        return jsonify({"mensaje": "Usuario registrado"}), 201
    except:
        return jsonify({"mensaje": "El correo o usuario ya existe"}), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)