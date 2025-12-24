document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistro");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Validar que las contraseñas coincidan
        const password = document.getElementById("password").value;
        const confirmar = document.getElementById("confirmar").value;

        if (password !== confirmar) {
            alert("Las contraseñas no coinciden. Por favor, verifica.");
            return;
        }

        // 2. Capturar los datos del formulario
        const datosUsuario = {
            nombre: document.getElementById("nombre").value,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value,
            usuario: document.getElementById("usuario").value,
            password: password // En producción, esto debería ir encriptado
        };

        try {
            // 3. Enviar los datos a tu futuro servidor (API)
            const respuesta = await fetch("http://localhost:3000/api/usuarios/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosUsuario)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
                window.location.href = "login.html"; // Redirigir al login
            } else {
                alert("Error: " + resultado.mensaje);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor. ¿Está encendido?");
        }
    });
});