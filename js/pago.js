document.addEventListener("DOMContentLoaded", () => {
    const btnFinalizar = document.querySelector(".btn-finalizar-compra");

    if (!btnFinalizar) {
        console.error("No se encontró el botón de finalizar compra");
        return;
    }

    btnFinalizar.addEventListener("click", async (e) => {
        e.preventDefault();

        const datosUsuario = localStorage.getItem("usuarioLogueado");
        if (!datosUsuario) {
            alert("Error: Debes iniciar sesión para comprar.");
            window.location.href = "login.html";
            return;
        }

        const usuario = JSON.parse(datosUsuario);

        const pedidoData = {
            usuario_id: usuario.id,
            numero_pedido: "ORD-" + Math.floor(Math.random() * 900000 + 100000),
            total: 120.00 
        };

        console.log("Enviando pedido:", pedidoData);

        try {
            const respuesta = await fetch("http://localhost:3000/api/pedidos/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedidoData)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                alert("¡Pedido guardado con éxito en la base de datos!");
                window.location.href = "perfil.html";
            } else {
                alert("Error del servidor: " + resultado.mensaje);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor Python.");
        }
    });
});