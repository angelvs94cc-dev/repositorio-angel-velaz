// ============================================
// BUCLES EN JAVASCRIPT - LIVE CODING
// ============================================

console.log("Bucles");

// Los bucles nos permiten repetir código sin escribirlo múltiples veces
// Son FUNDAMENTALES para trabajar con arrays

// ============================================
// 1. FOR CLÁSICO
// ============================================
// Sintaxis: for (inicio; condición; incremento){ código }

// CASO BÁSICO: Contar del 1 al 5
console.log("Contar del 1 al 5:");
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// Envío de emails
const totalUsers = 3;
for (let i = 1; i <= totalUsers; i++) {
  console.log(`Enviando email ${i} de ${totalUsers}`);
}

// Generador de códigos promocionales
for (let i = 1; i <= 5; i++) {
  console.log(`Código: PROMO${i}0OFF`);
}

// RECORRER UN ARRAY con for clásico
const students = ["Ana", "Carlos", "Laura", "Pedro"];

for (let i = 0; i < students.length; i++) {
  console.log(`${i + 1}. ${students[i]}`);
}

// Calcular total carrito de compra
const prices = [19.99, 45.50, 12.00, 8.99, 23.50];
let total = 0;

for (let i = 0; i < prices.length; i++) {
  console.log(`Producto ${i + 1}: ${prices[i]}€`);
  total += prices[i];
}

console.log(`Total a pagar: ${total.toFixed(2)} €`);

// ============================================
// 2. WHILE
// ============================================

let count = 1;
while (count <= 5) {
  console.log(count);
  count++;
}

// Sistema de intentos de login
let password = "secret123";
let userInput = "wrong"; // simulación input incorrecto
let attempts = 0;
let maxAttempts = 3;

while (attempts < maxAttempts && userInput !== password) {
  attempts++;
  console.log(`Intento ${attempts}: Password incorrecto`);

  // Simulamos que en el último intento pone el correcto
  if (attempts === 2) {
    userInput = "secret123";
  }
}

if (userInput === password) {
  console.log("Login exitoso");
} else {
  console.log("Cuenta bloqueada");
}

// Procesar cola de tareas
console.log("Procesando tareas:");
const taskQueue = ["Tarea 1", "Tarea 2", "Tarea 3"];

while (taskQueue.length > 0) {
  const task = taskQueue.shift();
  console.log(`Procesando: ${task}`);
}

console.log(taskQueue);
console.log("todas las tareas completadas");

// Buscar un elemento en un array hasta encontrarlo
const inventory = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];
const searchItem = "Keyboard";

let index = 0;
let found = false;

while (index < inventory.length && !found) {
  if (inventory[index] === searchItem) {
    found = true;
    console.log(`${searchItem} encontrado en la posición ${index}`);
  } else {
    console.log(`Revisando posición ${index}`);
  }
  index++;
}

// ============================================
// 3. DO...WHILE
// ============================================

// Diferencia: se ejecuta primero, luego verifica condición
let x = 10;
while (x < 5) {
  console.log("Esto no se ejecuta");
}
console.log("while no se ejecutó");

let y = 10;
do {
  console.log(`Esto se ejecuta al menos una vez, y = ${y}`);
} while (y < 5);

// Menú de opciones
let option = 0;
let menuShow = 0;

do {
  menuShow++;
  console.log("1. Ver perfil");
  console.log("2. Configuración");
  console.log("3. Salir");
  console.log(`Mostrando menú por ${menuShow} vez`);

  option = menuShow >= 2 ? 3 : 1; // simulación selección salir
} while (option !== 3);

console.log("Saliendo...");

console.clear();

// ============================================
// 4. FOR...OF
// ============================================

const fruits = ["Manzana", "Platano", "Naranja", "Pera", "Uvas"];

for (let fruit of fruits) {
  console.log(fruit);
}

// Comparación for clásico vs for...of
const color = ["Rojo", "Verde", "Amarillo"];

for (let i = 0; i < color.length; i++) {
  console.log(color[i]);
}

for (let colorForOf of color) {
  console.log(colorForOf);
}

// Validar emails
const emails = ["ana@mail.com", "invalid-email", "carlos@email.com", "test"];

for (let email of emails) {
  if (email.includes("@") && email.includes(".")) {
    console.log(`${email} es válido`);
  } else {
    console.log(`${email} es INválido`);
  }
}

// ============================================
// 5. BREAK
// ============================================

const users = ["Miriam", "Zoe", "Guille", "Angel", "Pepe"];
const userSearch = "Guille";

for (let user of users) {
  console.log(`Revisando: ${user}`);
  if (user === userSearch) {
    console.log("Usuario encontrado!");
    break;
  }
}

// Validar máximo intentos contraseña
const correctPassword = "keepcoding2024";
const passwordAttempts = ["wrong1", "wrong2", "keepcoding2024", "wrong3"];

for (let i = 0; i < passwordAttempts.length; i++) {
  console.log(`Intento ${i + 1}: ${passwordAttempts[i]}`);
  if (passwordAttempts[i] === correctPassword) {
    console.log("Acceso concedido");
    break;
  }
  console.log("Password incorrecto");
}

// ============================================
// 6. CONTINUE
// ============================================

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let num of numbers) {
  if (num % 2 !== 0) {
    continue; // Saltar números impares
  }
  console.log(`${num} es par`);
}

// Procesar solo emails válidos
const emailList = ["ana@mail.com", "invalid-email", "carlos@email.com", "test", "laura@email.com"];
let processedEmail = 0;

for (let email of emailList) {
  if (!email.includes("@") || !email.includes(".")) {
    console.log(`Saltando: ${email} (inválido)`);
    continue;
  }
  processedEmail++;
  console.log(`Procesando ${email}`);
}

console.log(`Total emails procesados: ${processedEmail}`);

// ============================================
// EJERCICIO 3.1: FizzBuzz
// ============================================

for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}