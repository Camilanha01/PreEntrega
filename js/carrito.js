let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminador = document.querySelector("#.carrito-producto-eliminar");
const carritoVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function subirProductoCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0){

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");

        carritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div,innerHTML = ` 
            <img class="carrito-producto-imagen" src=".${producto.imagen}" alt="${producto.nombre}">
            <div class="carrito-producto-nombre">
                <small>Titutlo</small>
                <h3>${producto.nombre}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <h3>${producto.cantidad}</h3>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <h3>$${producto.precio}</h3>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <h3>$${producto.precio * producto.cantidad}</h3>
            </div>
            <button class="carrito-producto-eliminar" id="eliminar${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            carritoProductos.appendChild(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    }else{
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
}

subirProductoCarrito();

function actualizarBotonesEliminar(){
    botonesEliminador = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminador.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index,1);
    subirProductoCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Se borraran los productos del carrito",
        icon: 'question',
        width:'350px',
        showCancelButton: true,
        focusConfirm: false,
        iconColor:'#0c225e',
        confirmButtonColor: '#0c225e',
        cancelButtonColor: '#0c225e',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    subirProductoCarrito();
        }
    })
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCalculado.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}