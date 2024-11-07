// Array de cursos con su información
const cursos = [
    { id: 1, nombre: "Matemáticas Básicas", nivel: "bajo", precio: 100 },
    { id: 2, nombre: "Fundamentos de Matemáticas", nivel: "medio", precio: 150 },
    { id: 3, nombre: "Matemáticas Intermedias", nivel: "medio-alto", precio: 200 },
    { id: 4, nombre: "Matemáticas Avanzadas", nivel: "alto", precio: 250 }
];

// Array del carrito de compras, recuperado del Local Storage si existe
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar el carrito en el DOM y en Local Storage
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ""; // Limpia el contenido previo

    // Muestra cada curso en el carrito
    carrito.forEach((curso) => {
        const item = document.createElement("li");
        item.textContent = `${curso.nombre} - $${curso.precio}`;
        listaCarrito.appendChild(item);
    });

    // Calcula y muestra el total en el DOM
    const total = carrito.reduce((acc, curso) => acc + curso.precio, 0);
    document.getElementById("total").textContent = `Total: $${total}`;

    // Guarda el carrito en Local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
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

// Al cargar la página, se muestran los cursos y el contenido del carrito
mostrarCursos();
actualizarCarrito();