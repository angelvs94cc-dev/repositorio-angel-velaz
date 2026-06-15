console.log("arrays");

// ============================================
// 1. LISTADO DE ESTUDIANTES
// ============================================
const estudiantes = ["Nerea", "Guille", "Julia", "Angel", "Ulises"];
console.log(estudiantes);

// Carrito de compra
const carritoCompra = [19.99, 45, 4.60];
console.log(carritoCompra);

// Array mixto
const mixed = ["Ana", 25, true, 19.99];
console.log("array mixto", mixed);

// ============================================
// 2. ACCEDER A ELEMENTOS DE UN ARRAY
// ============================================
const playlist = ["Song1", "Song2", "Song3", "Song4", "Song5"];
console.log(playlist[0]); // Song1
console.log(playlist[4]); // Song5
console.log("Longitud playlist:", playlist.length);
console.log("Último elemento:", playlist[playlist.length - 1]);

// split() - convertir string en array
let message = "Hola que tal".split(" "); // separa por palabras
console.log(message);

// ============================================
// 3. MODIFICAR ELEMENTOS DE UN ARRAY
// ============================================
const inventario = ["Laptop", "Mouse", "Teclado"];
inventario[1] = "Mouse sin cable";
console.log("Inventario modificado:", inventario);

const calificaciones = [85, 90, 75, 99, 92];
calificaciones[2] = 95;
console.log("Nueva calificación del alumno 3:", calificaciones[2]);

const taskStatus = ["pending", "completed", "cancelled"];
taskStatus[0] = "completed";
console.log("Tareas después de completar tarea 1:", taskStatus);

console.clear();

// ============================================
// 4. LENGTH - longitud de un array
// ============================================
const cities = ["Madrid", "Mallorca", "Cáceres", "Machala", "Mexico DF", "Toledo"];
console.log('Ciudades:', cities, "Longitud:", cities.length);

const todoList = ["picar código", "dormir"];
console.log(todoList.length === 0 ? "No tienes tareas pendientes" : `Tienes ${todoList.length} tarea(s)`);

// ============================================
// 5. MÉTODOS BÁSICOS DE ARRAYS
// ============================================
// push() - agregar al final
cities.push("Lima");
cities.push("Oviedo");
console.log("Cities con push:", cities);

// pop() - eliminar del final
const removed = cities.pop();
console.log("Ciudad eliminada:", removed);
console.log(cities);

// Deshacer acciones con pop
const history = ["Accion 1", "Accion 2", "Accion 3"];
const lastAction = history.pop();
console.log("Deshaciendo:", lastAction);
console.log("Historial actualizado:", history);

// unshift() - agregar al inicio
const priorities = ["Media", "Baja"];
priorities.unshift("Alta");
console.log("Prioridades actualizadas:", priorities);

// shift() - eliminar del inicio
priorities.shift();
priorities.shift();
console.log("Prioridades después de shift:", priorities);

console.clear();

// ============================================
// 6. BÚSQUEDA DE ELEMENTOS
// ============================================
const menu = ["Pizza", "Burguer", "Pasta", "Salad", "Pizza"];
console.log("Menú:", menu);
console.log("Posición Pasta:", menu.indexOf("Pasta"));
console.log("Posición Pizza:", menu.indexOf("Pizza"));
console.log("Posición Sushi:", menu.indexOf("Sushi")); // -1

// Verificar disponibilidad
const tienda = ["Laptop", "Mouse", "Keyboard", "Monitor"];
const productoBuscar = "Mouse";
const posicion = tienda.indexOf(productoBuscar);
console.log(posicion !== -1 ? `${productoBuscar} encontrado!` : `${productoBuscar} no disponible`);

// includes() - devuelve true o false
const allowedUser = ["admin", "user1", "user2", "moderator"];
console.log(allowedUser.includes("admin"));
console.log(allowedUser.includes("guest"));

// Función de permisos
function checkAccess(username) {
    const authorizedUsers = ["alice", "bob", "charlie"];
    return authorizedUsers.includes(username) ? `Acceso concedido a ${username}` : `Acceso DENEGADO a ${username}`;
}

console.log(checkAccess("alice"));
console.log(checkAccess("hacker"));

// Verificación de alérgenos
const ingredients = ["flour", "eggs", "milk", "sugar", "nuts"];
const allergies = ["nuts", "shellfish"];
const hasDanger = ingredients.includes(allergies[0]) || ingredients.includes(allergies[1]);
console.log(hasDanger ? "Contiene ingredientes alérgenos" : "Producto seguro");

// ============================================
// 7. ARRAYS BIDIMENSIONALES (2D)
// ============================================
const cinema = [
    ["A1", "A2", "A3", "A4"],
    ["B1", "B2", "B3", "B4"],
    ["C1", "C2", "C3", "C4"],
];
console.log(cinema[0][0]); // A1
console.log(cinema[1][2]); // B3

const ticTacToe = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "X"],
];

// Modificar datos
const seatStatus = [
    ["libre", "libre", "libre"],
    ["libre", "libre", "ocupado"],
    ["ocupado", "libre", "libre"],
];
seatStatus[1][1] = "ocupado";
console.log("Estado asiento [1][1]:", seatStatus[1]);

// Media de estudiantes
let notas = [
    [8, 7, 9],
    [6, 5, 7],
    [10, 9, 8]
];
console.log("Promedio estudiante 1:", (notas[0][0] + notas[0][1] + notas[0][2]) / 3);

// ============================================
// 8. ARRAYS MULTIDIMENSIONALES (3D)
// ============================================
const building = [
    [
        ["Desk-0-0", "Desk-0-1", "Desk-0-2", "Desk-0-3"],
        ["Desk-1-0", "Desk-1-1", "Desk-1-2", "Desk-1-3"],
    ],
    [
        ["Desk-0-0", "Desk-0-1", "Desk-0-2", "Desk1-0-3"],
        ["Desk-1-0", "Desk-1-1", "Desk-1-2", "Desk1-1-3"],
    ],
    [
        ["Desk2-0-0", "Desk2-0-1", "Desk2-0-2", "Desk2-0-3"],
        ["Desk2-1-0", "Desk2-1-1", "Desk2-1-2", "Desk2-1-3"],
    ],
];

console.log("Planta 1, Oficina 0, Escritorio 3:", building[1][0][2]);

