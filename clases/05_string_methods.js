// === APUNTES DE CLASE ===
// Métodos de String:
// .length, .includes(), .trim(), .toLowerCase(), .toUpperCase(), .charAt(), .indexOf(), .slice(), .replace(), .replaceAll()
// Chaining: .trim().toLowerCase() etc.

console.log("=== STRING METHODS ===");

let message = " Hello Keepcoding!  ";
let course = "Introducción a Javascript";

console.log("Original:", message);
console.log("Curso:", course);

// LENGTH: Longitud de un string
console.log("message.length:", message.length);
console.log("course.length:", course.length);

// includes() - verificar si contiene texto
console.log("course incluye 'Javascript'? ", course.includes("Javascript"));

// Caso práctico - validar email
let testEmail = "user@keepcoding.com";
const tieneArroba = testEmail.includes("@");
const tienePunto = testEmail.includes(".");
console.log((tieneArroba && tienePunto) ? "Email válido" : "Email inválido");

// TRIM - eliminar espacios al inicio y al final
console.log("Original:", `"${message}"`);
console.log("Trim:", `"${message.trim()}"`);

// toLowerCase -> convertir a minúsculas
console.log("message a minúsculas:", message.toLowerCase());

// Chaining: trim + minúsculas
const messageClean1 = message.trim().toLowerCase();
console.log("message limpio y minúsculas:", messageClean1);

// toUpperCase -> convertir a mayúsculas
const userInput = "keepcoding";
const correctAnswer = "KeepCoding";

console.log("userInput toUpperCase:", userInput.toUpperCase());
if (userInput.toUpperCase() === correctAnswer.toUpperCase()) {
    console.log("✅ Las respuestas coinciden");
}

// charAt() -> obtener un caracter en una posición
let text = "Javascript";
console.log("charAt(6):", text.charAt(6));
console.log("charAt(0):", text.charAt(0));

// indexOf -> posición de un string
console.log("Posición de 'Javascript' en course:", course.indexOf("Javascript"));
console.log("Posición de 'Python' en course:", course.indexOf("Python"));

// Validación de existencia
if(course.indexOf("Javascript") !== -1) console.log("Este curso es de JS");

// slice() -> Extraer parte de un string
console.log("slice(0,12):", course.slice(0, 12));
console.log("slice(17):", course.slice(17));
console.log("slice(-10):", course.slice(-10));

// Caso práctico - extraer nombre de usuario de un email
let email = "ana.garcia@keepcoding.io";
let userName = email.slice(0, email.indexOf("@"));
console.log("Nombre de usuario del email:", userName);

// replace() -> reemplaza la PRIMERA ocurrencia
let greeting = "Hello World";
console.log("Original greeting:", greeting);
console.log("Replace primera:", greeting.replace("World", "Keepcoding"));

// replaceAll() -> reemplazar todas las ocurrencias
const repeated = "hello hello hello";
console.log("Replace primera:", repeated.replace("hello", "hi"));
console.log("Replace todas:", repeated.replaceAll("hello", "hi"));

// Encadenar métodos
let result = " Javascript es alucinante! "
    .trim()
    .toUpperCase()
    .replace("ALUCINANTE", "LA HOSTIA");
console.log("Encadenando métodos:", result);

// --- SEPARACIÓN ---
console.log("\n-------------------------------------");

// === EJERCICIO CASA - Analizador de texto ===
console.log("EJERCICIO CASA - Analizador de texto");

let texto = "   Me gusta aprender JavaScript cada día   ";

// 1. Eliminar espacios
let textoLimpio = texto.trim();
console.log("Texto limpio:", textoLimpio);

// 2. Mayúsculas
console.log("Texto en mayúsculas:", textoLimpio.toUpperCase());

// 3. Minúsculas
console.log("Texto en minúsculas:", textoLimpio.toLowerCase());

// 4. Contiene "javascript"?
console.log("¿Contiene 'javascript'? :", textoLimpio.toLowerCase().includes("javascript"));

// 5. Primeros 5 caracteres
console.log("Primeros 5 caracteres:", textoLimpio.slice(0, 5));

// 6. Longitud mayor a 20
console.log("¿Tiene más de 20 caracteres?:", textoLimpio.length > 20);