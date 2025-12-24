document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-contacto");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Eliminar mensaje previo
        const mensajePrevio = document.querySelector(".mensaje-enviado");
        if (mensajePrevio) mensajePrevio.remove();

        // Crear mensaje
        const mensaje = document.createElement("div");
        mensaje.className = "mensaje-enviado";
        mensaje.innerHTML = `
            <span class="icono">🍷</span>
            <p>Tu mensaje fue enviado correctamente.  
            Nuestro equipo se pondrá en contacto contigo.</p>
        `;

        form.appendChild(mensaje);
        form.reset();

        setTimeout(() => {
            mensaje.classList.add("ocultar");
        }, 3500);

        setTimeout(() => {
            mensaje.remove();
        }, 4500);
    });
});
