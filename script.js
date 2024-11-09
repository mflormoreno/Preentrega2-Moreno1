// Array de cursos
const cursos = [
    { id: 1, nombre: "Clases virtuales para nivel secundario", nivel: "Básico", precio: 8000 },
    { id: 2, nombre: "Clases virtuales para ingreso a UNLaM", nivel: "Intermedio", precio: 9000 },
    { id: 3, nombre: "Álgebra I", nivel: "Básico", precio: 5000 },
    { id: 4, nombre: "Álgebra II", nivel: "Intermedio", precio: 6000 },
    { id: 5, nombre: "Análisis matemático I", nivel: "Básico", precio: 5500 },
    { id: 6, nombre: "Análisis matemático II", nivel: "Intermedio", precio: 6500 },
    { id: 7, nombre: "Ingreso a UNLaM", nivel: "Intermedio", precio: 7000 }
];

// Array del carrito de compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualiza el carrito en el DOM y en Local Storage
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ""; 

    // Botón de eliminar al lado de cada curso
    carrito.forEach((curso, index) => {
        const item = document.createElement("li");
        item.textContent = `${curso.nombre} - $${curso.precio}`;

        // Botón para eliminar el curso del carrito
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        btnEliminar.onclick = () => {
            eliminarDelCarrito(index);
        };

        item.appendChild(btnEliminar); // Botón al lado del elemento de la lista de carrito
        listaCarrito.appendChild(item);
    });

    // Calcula y muestra el total en el DOM
    const total = carrito.reduce((acc, curso) => acc + curso.precio, 0);
    document.getElementById("total").textContent = `Total: $${total}`;

    // Guarda el carrito en Local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Muestra el botón de comprar solo si hay elementos en el carrito
    const btnComprar = document.getElementById("btn-comprar");
    btnComprar.style.display = carrito.length > 0 ? "block" : "none";

    // Muestra el botón de vaciar carrito solo si hay productos en el carrito
    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.style.display = carrito.length > 0 ? "inline-block" : "none"; 
}

// Función para eliminar un curso del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    actualizarCarrito(); 
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = []; 
    actualizarCarrito(); 
    localStorage.removeItem("carrito"); 
}

// Agrega un curso al carrito
function agregarAlCarrito(idCurso) {
    const cursoSeleccionado = cursos.find(curso => curso.id === idCurso);
    carrito.push(cursoSeleccionado);
    actualizarCarrito();
}

// Muestra los cursos en el DOM
function mostrarCursos() {
    const contenedorCursos = document.getElementById("cursos");

    cursos.forEach((curso) => {
        const cursoDiv = document.createElement("div");
        cursoDiv.classList.add("col-md-4", "curso", "p-3", "border", "rounded", "text-center");
        cursoDiv.innerHTML = `
            <h3>${curso.nombre}</h3>
            <p>Nivel: ${curso.nivel}</p>
            <p>Precio: $${curso.precio}</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${curso.id})">Agregar al Carrito</button>
        `;
        contenedorCursos.appendChild(cursoDiv);
    });
}

// Mensaje de compra/no compra
function comprarCarrito() {
    if (carrito.length > 0) {
        alert("¡Gracias por tu compra!");
        carrito = []; 
        actualizarCarrito(); 
        localStorage.removeItem("carrito"); 
    } else {
        alert("El carrito está vacío.");
    }
}

// Al cargar la página, se muestran los cursos y el contenido del carrito
mostrarCursos();
actualizarCarrito();