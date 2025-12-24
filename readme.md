# Digital Wine 🍷
URL del repositorio de GitHub: https://github.com/deyciandreacamargoramos5-creator/Proyecto_Final_Personal.git
URL del proyecto hospedado: https://anycrmn58.pythonanywhere.com 
## Descripción
Digital Wine es una plataforma web diseñada para la gestión y venta de vinos seleccionados. 
Permite a los usuarios explorar un catálogo variado, registrarse y contactar directamente con la bodega.
# Funcionalidades principales
1. Catálogo Dinámico de Productos
- Visualización de Inventario: Consulta automática a MySQL para mostrar nombre, cepa, cosecha y precio de los vinos.
- Filtros de Búsqueda: Lógica de frontend que permite explorar productos por categorías específicas.
- Interfaz Adaptable (Responsive): Diseño ajustado para visualización óptima en escritorio y móviles mediante Media Queries.
2. Sistema de Gestión de Consultas
- Captura Segura: Formulario de contacto que utiliza el método POST para enviar datos al servidor Flask.
- Validación: Uso de JavaScript para verificar formatos de correo y campos obligatorios en tiempo real.
- Persistencia: Registro automático de mensajes en la base de datos para revisión administrativa.
3. Backend y Enrutamiento
- Rutas Dinámicas: Navegación fluida entre secciones (Inicio, Productos, Contacto).
- Motor de Plantillas (Jinja2): Inyección de datos de la base de datos directamente en el HTML para actualizaciones automáticas.
- Manejo de Errores: Implementación de excepciones para asegurar la estabilidad del sistema ante fallos de conexión.
## Lenguajes utilizados
* **HTML**
* **CSS**
* **JS**
* **Python**
* **SQL**
# Arquitectura del Sistema
La aplicación utiliza un modelo relacional con tablas normalizadas para garantizar la integridad de los datos de productos y usuarios. 
La comunicación se gestiona mediante:
- do_GET: Recuperación de datos de la API y servicio de interfaz.
- do_POST: Procesamiento de datos de formularios de contacto y registro.