let datosConfirmados = false;

function abrirPago(tipo) {
    cerrarModales();

    if (tipo === 'tarjeta') {
        document.getElementById('modal-tarjeta').style.display = 'flex';
    }

    if (tipo === 'yape') {
        document.getElementById('modal-yape').style.display = 'flex';
    }
}

function cerrarModales() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function validarTarjeta() {
    const numero = document.getElementById('tarjeta-numero').value.trim();
    const fecha = document.getElementById('tarjeta-fecha').value.trim();
    const cvv = document.getElementById('tarjeta-cvv').value.trim();

    if (!/^\d{16}$/.test(numero)) {
        alert('El número de tarjeta debe tener 16 dígitos');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(fecha)) {
        alert('La fecha debe tener formato MM/AA');
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('El CVV debe tener 3 dígitos');
        return;
    }

    datosConfirmados = true;
    cerrarModales();
    alert('Datos confirmados ✔️');
}

function validarYape() {
    const celular = document.getElementById('yape-celular').value.trim();
    const codigo = document.getElementById('yape-codigo').value.trim();

    if (!/^\d{9}$/.test(celular)) {
        alert('El número de celular debe tener 9 dígitos');
        return;
    }

    if (codigo.length < 4) {
        alert('Código de verificación inválido');
        return;
    }

    datosConfirmados = true;
    cerrarModales();
    alert('Datos confirmados ✔️');
}

function pagar() {
    const metodo = document.querySelector('input[name="pago"]:checked').value;

    if (metodo !== 'entrega' && !datosConfirmados) {
        alert('Primero debes confirmar los datos del pago');
        return;
    }

    mostrarConfirmacion();
}

function mostrarConfirmacion() {
    document.getElementById('titulo-confirmacion').textContent = 'Pedido confirmado ✔️';
    document.getElementById('mensaje-confirmacion').innerHTML =
        'Tu pedido va en camino 🚚<br>' +
        'Hemos enviado la confirmación a tu correo electrónico 📧';

    document.getElementById('modal-confirmacion').style.display = 'flex';

    localStorage.removeItem('carrito');
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cerrarModales();
    }
});

function finalizarPedido() {
    cerrarModales();
    window.location.href = "index.html";
}
