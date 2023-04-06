//barra nav

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.remove("visible");
})

//Productos

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

//Array productos
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
    });
}