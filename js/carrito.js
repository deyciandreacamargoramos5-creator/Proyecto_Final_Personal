let carrito = [];
let total = 0;

function agregarCarrito(nombre, precio){
    carrito.push({nombre, precio});
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito(){
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    carrito.forEach((item, index)=>{
        lista.innerHTML += `
    <li>
        ${item.nombre} - S/. ${item.precio.toFixed(2)}
        <button onclick="eliminar(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-weight:bold;">✕</button>
    </li>`;
    });
    document.getElementById("total").innerText = total.toFixed(2);
}

function eliminar(index){
    total -= carrito[index].precio;
    carrito.splice(index,1);
    actualizarCarrito();
}

function vaciarCarrito(){
    carrito=[];
    total=0;
    actualizarCarrito();
}
function irAPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", total.toFixed(2));

    window.location.href = "pago.html";
}
