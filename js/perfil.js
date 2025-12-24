document.addEventListener("DOMContentLoaded", async () => {
    const datosGuardados = localStorage.getItem("usuarioLogueado");

    if (!datosGuardados) {
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(datosGuardados);

    document.getElementById("perfil-nombre").textContent = usuario.nombre;
    document.getElementById("perfil-correo").textContent = usuario.correo;
    document.getElementById("perfil-usuario").textContent = usuario.usuario;

    const historialSimulado = [
        { numero_pedido: "WINE-4521", fecha: "15/12/2023", total: 185.00 },
        { numero_pedido: "WINE-3982", fecha: "20/11/2023", total: 72.50 },
        { numero_pedido: "WINE-2105", fecha: "05/10/2023", total: 310.00 }
    ];

    const contenedorHistorial = document.querySelector(".perfil-historial");

    const titulo = contenedorHistorial.querySelector("h2");
    contenedorHistorial.innerHTML = "";
    if (titulo) contenedorHistorial.appendChild(titulo);

    historialSimulado.forEach(pedido => {
        const divPedido = document.createElement("div");
        divPedido.className = "pedido";
        
        divPedido.innerHTML = `
            <span>🍷 Pedido: ${pedido.numero_pedido}</span>
            <span>📅 Fecha: ${pedido.fecha}</span>
            <span>💰 Total: S/ ${parseFloat(pedido.total).toFixed(2)}</span>
        `;
        contenedorHistorial.appendChild(divPedido);
    });

    const btnLogout = document.querySelector(".btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "index.html";
        });
    }
});