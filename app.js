let productos = [];
let carrito = [];

// DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("carrito");
const totalElemento = document.getElementById("total");
const btnFinalizar = document.getElementById("finalizar-compra");

// FETCH JSON
fetch("../data/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos();
    });

// MOSTRAR PRODUCTOS
function mostrarProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button data-id="${producto.id}">Agregar</button>
    `;

        contenedorProductos.appendChild(div);
    });

    agregarEventosBotones();
}

// EVENTOS
function agregarEventosBotones() {
    const botones = document.querySelectorAll("button[data-id]");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
    });
}

// AGREGAR AL CARRITO
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);

    actualizarCarrito();

    Swal.fire({
        title: "Producto agregado",
        text: producto.nombre,
        icon: "success",
        timer: 1000,
        showConfirmButton: false
    });
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    totalElemento.textContent = `Total: $${total}`;
}

// FINALIZAR COMPRA
btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire("Carrito vacío");
        return;
    }

    Swal.fire({
        title: "Compra realizada",
        text: "Gracias por tu compra",
        icon: "success"
    });

    carrito = [];
    actualizarCarrito();
});