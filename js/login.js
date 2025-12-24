document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-login");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const correo = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            const respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, password })
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem("usuarioLogueado", JSON.stringify(resultado.usuario));
                alert(`¡Bienvenido ${resultado.usuario.nombre}!`);
                window.location.href = "perfil.html";
            } else {
                alert("Error: " + resultado.mensaje);
            }
        } catch (error) {
            alert("Error de conexión con el servidor Python.");
        }
    });
});