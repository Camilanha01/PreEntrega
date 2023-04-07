

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.remove("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


class Productos{
    constructor (id, nombre, imagen, categoria, precio){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = 1;
    }
}

//Producto 1
const productoA = new Productos("producto-1", "Producto A", "https://dummyimage.com/400x600/000/fff", "Producto1", 1000);
const productoB = new Productos("producto-2", "Producto B", "https://dummyimage.com/400x600/000/fff", "Producto1", 1000);
const productoC = new Productos("producto-3", "Producto C", "https://dummyimage.com/400x600/000/fff", "Producto1", 1000);
const productoD = new Productos("producto-4", "Producto D", "https://dummyimage.com/400x600/000/fff", "Producto1", 1000);

//Producto 2
const productoE = new Productos("producto-5", "Producto E", "https://dummyimage.com/400x600/000/fff", "Producto2", 1000);
const productoF = new Productos("producto-6", "Producto F", "https://dummyimage.com/400x600/000/fff", "Producto2", 1000);
const productoG = new Productos("producto-7", "Producto G", "https://dummyimage.com/400x600/000/fff", "Producto2", 1000);
const productoH = new Productos("producto-8", "Producto H", "https://dummyimage.com/400x600/000/fff", "Producto2", 1000);

//Producto 3
const productoI = new Productos("producto-9", "Producto I", "https://dummyimage.com/400x600/000/fff", "Producto3", 1000);
const productoJ = new Productos("producto-10", "Producto J", "https://dummyimage.com/400x600/000/fff", "Producto3", 1000);
const productoK = new Productos("producto-11", "Producto K", "https://dummyimage.com/400x600/000/fff", "Producto3", 1000);
const productoL = new Productos("producto-12", "Producto L", "https://dummyimage.com/400x600/000/fff", "Producto3", 1000);

//Producto 4
const productoM = new Productos("producto-1", "Producto M", "https://dummyimage.com/400x600/000/fff", "Producto4", 1000);
const productoN = new Productos("producto-14", "ProductoN", "https://dummyimage.com/400x600/000/fff", "Producto4", 1000);
const productoO = new Productos("producto-15", "Producto O", "https://dummyimage.com/400x600/000/fff", "Producto4", 1000);
const productoP = new Productos("producto-16", "Producto P", "https://dummyimage.com/400x600/000/fff", "Producto4", 1000);


const productos = [productoA, productoB, productoC, productoD, productoE, productoF, productoG, productoH, productoI, productoJ,
productoK, productoL, productoM, productoN, productoO, productoP]

const contenedorProductos = document.querySelector("#contenedorProducto");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
let botonesAgregados = document.querySelector("#numero");

function agregarProductos(productos){
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("prducto");
        div.innerHTML = ` <div class="producto">
                             <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                             <div class="producto-detalle">
                                 <h3 class="producto-nombre">${producto.nombre}</h3>
                                 <p class="producto-precio"> $${producto.precio}</p>
                                 <button class="producto-agregar" id="${producto.id}">Agregar</button>
                             </div>
                          </div>
        `
        contenedorProductos.append(div)
    });
    actualizarBotonesAgregados();
}

agregarProductos(productos);

const producto1 = productos.filter((prod) => prod.categoria === 'producto1');
const producto2 = productos.filter((prod) => prod.categoria === 'producto2');
const producto3 = productos.filter((prod) => prod.categoria === 'producto3');
const producto4 = productos.filter((prod) => prod.categoria === 'producto4');

botonesCategoria.forEach((boton, id) => {
    boton.addEventListener('click', () => {
        let botonDinamico = boton.id
        switch (botonDinamico) {
            case 'producto1':
                categoria(producto1)
                break;
            case 'producto2':
                categoria(producto2)
                break;
            case 'producto3':
                categoria(producto3)
                break;
            case 'producto4':
                categoria(producto4)
                break;
            default:
                agregarProductos(productos)
                break;
        }
    })
})

function mostrarDiv() {
    let mostrar = document.getElementById("ocultar");
    mostrar.style.display = "block";
}
mostrarDiv();

function hide(){
    let hide1 = document.getElementById("productos");
    hide1.addEventListener("click", () => {
        let ocultar = document.getElementById("ocultar");
        ocultar.style.display = "none";
    });
}
hide();

function mostrarInicio() {
    let botonMostrarTodo = document.getElementById("todos");
    botonMostrarTodo.addEventListener("click", () => {
        mostrarDiv();
    });
}

mostrarInicio();



function categoria(array) {
    contenedorProductos.innerHTML = "";
    array.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `   
        <div class="producto">
          <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
          <div class="producto-detalle">
             <h3 class="producto-titulo">${producto.titulo}</h3>
             <p class="producto-precio"> $${producto.precio}</p>
             <button class="producto-agregar" id="${producto.id}">Agregar</button>
          </div>
        </div>
        `
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregados();
}

function actualizarBotonesAgregados(){
    botonesAgregados = document.querySelectorAll(".producto-agregar");

    botonesAgregados.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){

    Toastify({
        Text: "Producto Agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        color: "white",
        background: "linear-gradient(to right, #0c225e, #0c225e)",
        fontSize: "1rem",
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBton);

    if(productosEnCarrito.some(producto => producto.id == idBton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumero(){
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    nuevoNumero.innerText = nuevoNumero;
}