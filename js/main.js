//NAV
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


//PRODUCTOS 

class Producto{
    constructor (id, titulo, imagen, categoria, precio){
        this.id = id;
        this.titulo = titulo;
        this.imagen = imagen;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = 1;
    }
}

//remeras 
const remera1 = new Producto("remeras-1", "Remera 1", "https://dummyimage.com/400x600/000/fff", "remeras", 1000);
const remera2 = new Producto("remeras-2", "Remera 2", "https://dummyimage.com/400x600/000/fff", "remeras", 1000);
const remera3 = new Producto("remeras-3", "Remera 3", "https://dummyimage.com/400x600/000/fff", "remeras", 1000);
const remera4 = new Producto("remeras-4", "Remera 4", "https://dummyimage.com/400x600/000/fff", "remeras", 1000);

//jeans
const jean1 = new Producto("jean-1", "Jean 1", "https://dummyimage.com/400x600/000/fff", "jeans", 1000);
const jean2 = new Producto("jean-2", "Jean 2", "https://dummyimage.com/400x600/000/fff", "jeans", 1000);
const jean3 = new Producto("jean-3", "Jean 3", "https://dummyimage.com/400x600/000/fff", "jeans", 1000);
const jean4 = new Producto("jean-4", "Jean 4", "https://dummyimage.com/400x600/000/fff", "jeans", 1000);

//buzos
const buzo1 = new Producto("buzos-1", "Buzos 1", "https://dummyimage.com/400x600/000/fff", "buzos", 1000);
const buzo2 = new Producto("buzos-2", "Buzos 2", "https://dummyimage.com/400x600/000/fff", "buzos", 1000);
const buzo3 = new Producto("buzos-3", "Buzos 3", "https://dummyimage.com/400x600/000/fff", "buzos", 1000);
const buzo4 = new Producto("buzos-4", "Buzos 4", "https://dummyimage.com/400x600/000/fff", "buzos", 1000);

//camperas
const camperas1 = new Producto("camperas-1", "Camperas 1", "https://dummyimage.com/400x600/000/fff", "camperas", 1000);
const camperas2 = new Producto("camperas-2", "Camperas 2", "https://dummyimage.com/400x600/000/fff", "camperas", 1000);
const camperas3 = new Producto("camperas-3", "Camperas 3", "https://dummyimage.com/400x600/000/fff", "camperas", 1000);


const productos = [remera1, remera2, remera3, remera4, jean1, jean2, jean3, jean4, buzo1, buzo2, buzo3, buzo4,
camperas1, camperas2, camperas3]

const contenedorProductos = document.querySelector("#contenedorProducto");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
let botonesAgregados = document.querySelector(".producto-agregar");
const numerito = document.querySelector("#numerito");

function agregarProductos(productos){

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => 
        {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` <div class="producto">
                             <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                             <div class="producto-detalle">
                                 <h3 class="producto-titulo">${producto.titulo}</h3>
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

const remeras = productos.filter((prod) => prod.categoria === 'remeras')
const jeans = productos.filter((prod) => prod.categoria === 'jeans')
const buzos = productos.filter((prod) => prod.categoria === 'buzos')
const camperas = productos.filter((prod) => prod.categoria === 'camperas')

botonesCategoria.forEach((boton, id) => {
    boton.addEventListener('click', () => {
        let botonDinamico = boton.id
        switch (botonDinamico) {
            case 'buzos':
                categoria(buzos)
                break;
            case 'remeras':
                categoria(remeras)
                break;
            case 'camperas':
                categoria(camperas)
                break;
            case 'jeans':
                categoria(jeans)
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

function buscarProductos(){
    let search = document.getElementById("buscar");
    search.addEventListener("input", () => {
        const valorBusqueda = search.value;
        const productosFiltrados = productos.filter((producto) => {
            return producto.nombre.toLowerCase().includes(valorBusqueda.toLowerCase());
        });

        agregarProductos(productosFiltrados);
    });
}
buscarProductos();


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
        boton.addEventListener("click", meterAlCarrito);
    })
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function meterAlCarrito(e){
    const idBton= e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBton);

    if(productosEnCarrito.some(producto => producto.id == idBton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito(){
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
}
