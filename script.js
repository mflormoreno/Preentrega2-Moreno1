let carrito = [];

try {
    const carritoGuardado = localStorage.getItem("carrito");
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    if (!Array.isArray(carrito)) throw new Error("El carrito no es un array válido");
} catch (error) {
    console.error("Error al cargar el carrito desde Local Storage:", error);
    carrito = []; 
}

let cursos = [];

function obtenerCursos() {
    fetch("/ProyectoFinal-Moreno/json/cursos.json")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        cursos = data;
        mostrarCursos(); 
    })
    .catch(error => console.error("Error al cargar los cursos:", error));
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ""; 

    carrito.forEach((curso, index) => {
        const item = document.createElement("li");
        item.textContent = `${curso.nombre} - $${curso.precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        btnEliminar.onclick = () => eliminarDelCarrito(index);

        item.appendChild(btnEliminar);
        listaCarrito.appendChild(item);
    });

    const total = carrito.reduce((acc, curso) => acc + curso.precio, 0);
    document.getElementById("total").textContent = `Total: $${total}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    document.getElementById("btn-comprar").style.display = carrito.length > 0 ? "block" : "none";
    document.getElementById("vaciar-carrito").style.display = carrito.length > 0 ? "inline-block" : "none";
}

function agregarAlCarrito(idCurso) {
    const cursoSeleccionado = cursos.find(curso => curso.id === idCurso);
    if (cursoSeleccionado) {
        carrito.push(cursoSeleccionado); 
        actualizarCarrito(); 
    } else {
        console.error("El curso seleccionado no existe.");
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    actualizarCarrito(); 
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    localStorage.removeItem("carrito");
}

function mostrarCursos() {
    const contenedorCursos = document.getElementById("cursos");
    contenedorCursos.innerHTML = "";

    cursos.forEach(curso => {
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

document.addEventListener("DOMContentLoaded", () => {
    obtenerCursos();
    actualizarCarrito();
});
