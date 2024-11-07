// Array de cursos
const cursos = [
    { id: 1, nombre: "Clases virtuales para nivel secundario", nivel: "bajo", precio: 8000 },
    { id: 2, nombre: "Clases virtuales para ingreso a UNLaM", nivel: "medio", precio: 9000 },
    { id: 3, nombre: "Álgebra I", nivel: "basico", precio: 5000 },
    { id: 4, nombre: "Álgebra II", nivel: "intermedio", precio: 6000 },
    { id: 5, nombre: "Análisis matemático I", nivel: "Básico", precio: 5500 },
    { id: 6, nombre: "Análisis matemático II", nivel: "intermedio", precio: 6500 },
    { id: 7, nombre: "Ingreso a UNLaM", nivel: "intermedio", precio: 7000 }
];

// Array del carrito de compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Pregunta si el usuario quiere limpiar el carrito al cargar la página, solo si tiene elementos
if (carrito.length > 0 && confirm("¿Quieres borrar el carrito al actualizar la página?")) {
    carrito = [];
    localStorage.removeItem("carrito");
}

// Función para actualizar el carrito en el DOM y en Local Storage
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ""; // Limpia el contenido previo

    // Muestra cada curso en el carrito con un botón de eliminar
    carrito.forEach((curso, index) => {
        const item = document.createElement("li");
        item.textContent = `${curso.nombre} - $${curso.precio}`;

        // Botón para eliminar el curso del carrito
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => {
            eliminarDelCarrito(index);
        };

        item.appendChild(btnEliminar); // Agrega el botón al elemento de la lista
        listaCarrito.appendChild(item);
    });

    // Calcula y muestra el total en el DOM
    const total = carrito.reduce((acc, curso) => acc + curso.precio, 0);
    document.getElementById("total").textContent = `Total: $${total}`;

    // Guarda el carrito en Local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Muestra el botón de comprar si hay elementos en el carrito
    const btnComprar = document.getElementById("btn-comprar");
    btnComprar.style.display = carrito.length > 0 ? "block" : "none";
}

// Función para eliminar un curso del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Elimina el curso del array
    actualizarCarrito(); // Actualiza el carrito en el DOM y Local Storage
}

// Función para agregar un curso al carrito
function agregarAlCarrito(idCurso) {
    const cursoSeleccionado = cursos.find(curso => curso.id === idCurso);
    carrito.push(cursoSeleccionado);
    actualizarCarrito();
}

// Función para mostrar los cursos en el DOM
function mostrarCursos() {
    const contenedorCursos = document.getElementById("cursos");

    cursos.forEach((curso) => {
        const cursoDiv = document.createElement("div");
        cursoDiv.innerHTML = `
            <h3>${curso.nombre}</h3>
            <p>Nivel: ${curso.nivel}</p>
            <p>Precio: $${curso.precio}</p>
            <button onclick="agregarAlCarrito(${curso.id})">Agregar al Carrito</button>
        `;
        contenedorCursos.appendChild(cursoDiv);
    });
}

// Función para procesar la compra
function comprarCarrito() {
    if (carrito.length > 0) {
        alert("Gracias por tu compra!");
        carrito = []; // Vacía el carrito
        actualizarCarrito(); // Actualiza el DOM y el Local Storage
        localStorage.removeItem("carrito"); // Borra el carrito del Local Storage
    } else {
        alert("El carrito está vacío.");
    }
}

// Al cargar la página, se muestran los cursos y el contenido del carrito
mostrarCursos();
actualizarCarrito();