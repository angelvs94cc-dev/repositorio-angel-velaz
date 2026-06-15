console.log("=== TRUTHY Y FALSY ===");

// En JavaScript, todos los valores se pueden evaluar como true o false
// Muy útil en condicionales

// ==== Valores FALSY (los 6 oficiales) ====

// 1. false
if (false) {
  console.log("Esto NO se ejecuta");
} else {
  console.log("false es falsy");
}

// 2. El número 0
if (0) {
  console.log("No se ejecuta 0");
} else {
  console.log("0 es falsy");
}

// 3. String vacío ""
const emptyString = "";
if (emptyString) {
  console.log("Esto NO se ejecuta");
} else {
  console.log("String vacío '' es falsy");
}

// 4. null
if (null) {
  console.log("Esto NO se ejecuta");
} else {
  console.log("null es falsy");
}

// 5. undefined
const value1 = undefined;
const message1 = value1 ? "Existe el value1" : "No existe value1";
console.log(message1);

// 6. NaN (Not a Number)
if (NaN) {
  console.log("Esto NO se ejecuta");
} else {
  console.log("NaN es falsy");
  console.log(typeof NaN); // number
}

// ==== Valores TRUTHY ====
// Todo lo demás es truthy

if (42) console.log("42 es truthy");
if (-5) console.log("-5 es truthy");

// cualquier string con contenido (aunque sea un espacio)
const saludo = " ";
if (saludo) console.log("Mi crush me ha saludado!");

// string "0"
if ("0") console.log("'0' en string es truthy");

// boolean true
if (true) console.log("true es truthy");

// ==== Casos prácticos ====

// Validación de usuario
let username = "";

if (username) {
  console.log(`Hola ${username}`);
} else {
  console.log("Por favor, introduzca username");
}

// Validación de edad (0 es válido)
let age = 0;

if (age || age === 0) {
  console.log(`Tu edad es ${age}`);
} else {
  console.log("No hay edad");
}

// Comparación explícita
if (age !== undefined && age !== null) {
  console.log(`Tu edad es ${age}`);
} else {
  console.log("No hay edad");
}

// Nullish Coalescing (??)
const displayAge = age ?? "Age not provided";
console.log("DisplayAge:", displayAge);

// Configuraciones con || vs ??
const config1 = { timeout: 0 };
const config2 = { timeout: null };
const config3 = {};

console.log("Con ||:", config1.timeout || 3000); // cuidado, 0 se considera falsy
console.log("Con ??:", config1.timeout ?? 3000); // correcto, solo null o undefined
console.log("Con ??:", config2.timeout ?? 3000);
console.log("Con ??:", config3.timeout ?? 3000);

// Valores que confunden: string "false" y "0"
if ("false") console.log("El string 'false' es truthy");
if (0) {
  console.log("No se ejecuta");
} else {
  console.log("El número 0 es falsy");
}

// Negación !
let value = "";
if (!value) {
  console.log("value está vacío o es falsy");
} else {
  console.log("value tiene contenido");
}

value = "Hello";
if (!value) {
  console.log("Esto NO se ejecuta");
} else {
  console.log("value tiene contenido");
}