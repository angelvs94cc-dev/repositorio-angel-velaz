console.log("ESTRUCTURAS DE CONTROL");


// ============================================
// SENTENCIAS CONDICIONALES - IF/ELSE
// ============================================

// Las estructuras condicionales nos permiten ejecutar código SOLO si se cumple una condición


// ============================================
// IF simple
// ============================================

const temperatura = 30;

if (temperatura > 25) {
  console.log("Hace calor!");
}

const esAdulto = false;

if (esAdulto) {
  console.log("Eres adulto");
}


// ============================================
// IF...ELSE (bifurcación)
// ============================================

const edad = 16;

if (edad >= 18) {
  console.log("Puedes entrar");
} else {
  console.log("NO puedes entrar aquí, bye");
}


// ============================================
// IF sin llaves
// ============================================

const miEdad = 22;

if (miEdad >= 18)
  console.log("Puedes entrar ahora");

console.log("Bienvenido!");

// Es recomendable usar llaves siempre para evitar errores


// ============================================
// Ejemplo lógica de negocio
// ============================================

const nombreProducto1 = "T-Shirt";
const precioProducto1 = 16;
let cantidadProducto1 = 2;

const nombreProducto2 = "Jeans";
const precioProducto2 = 40;
let cantidadProducto2 = 1;

const totalDespuesDeDescuento = 55;

if (totalDespuesDeDescuento > 50) {
  console.log("Tienes envío gratis");
} else {
  console.log("Costes de envío aplicados");
}


// Reasignación de variables usando condicionales

let mensaje;

if (precioProducto1 < precioProducto2) {
  mensaje = "Producto T-Shirt tiene mejor precio que Jeans";
} else {
  mensaje = `Producto ${nombreProducto1} es más caro que ${nombreProducto2}`;
}

console.log(mensaje);


// ============================================
// ENCADENAMIENTO DE CONDICIONES
// If... else if... else
// El orden importa
// ============================================

const nota = 80;

if (nota >= 90) {
  console.log("Sobresaliente!");
} else if (nota >= 70) {
  console.log("Notable");
} else if (nota >= 50) {
  console.log("Aprobado");
} else {
  console.log("Suspendido");
}


let mensaje2;
const score = 85;

if (score >= 90) {
  mensaje2 = "Excelente";
} else if (score >= 70) {
  mensaje2 = "Bien";
} else {
  mensaje2 = "Necesitas mejorar";
}

console.log(mensaje2);


// ============================================
// HOISTING
// ============================================

// Con var:
console.log(userName);
var userName = "Alicia";

// Con let daría error:
// console.log(userAge);
// let userAge = 30;


// ============================================
// CONDICIONES COMBINADAS
// ============================================

const edad5 = 25;
const tieneLicencia = true;

const puedeConducir = edad5 >= 18 && tieneLicencia;

if (puedeConducir) {
  console.log("Puedes conducir");
} else {
  console.log("No puedes conducir");
}


// ============================================
// CASO PRÁCTICO: Sistema de descuentos
// ============================================

const precioOriginal = 100;
const esEstudiante = true;
const esMiembro = false;

let precioFinal = precioOriginal;

if (esEstudiante) {
  precioFinal = precioOriginal * 0.8;
  console.log("Descuento de estudiante aplicado");
} else if (esMiembro) {
  precioFinal = precioOriginal * 0.9;
  console.log("Descuento de miembro aplicado");
} else {
  console.log("Sin descuento aplicado");
}

console.log(`Precio original: ${precioOriginal} €`);
console.log(`Precio final: ${precioFinal} €`);


// ============================================
// EJERCICIO - Par o Impar
// ============================================

console.log("\nEJERCICIO - Par o Impar:");

const numero2 = 17;

if (numero2 % 2 === 0) {
  console.log(`${numero2} es par`);
} else {
  console.log(`${numero2} es impar`);
}


// ============================================
// OPERADOR TERNARIO
// ============================================

const edad3 = 20;

const mensaje3 = edad3 >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje3);


// Equivalente con if/else

let mensaje4;

if (edad3 >= 18) {
  mensaje4 = "Mayor de edad";
} else {
  mensaje4 = "Menor de edad";
}

console.log(mensaje4);


// Caso práctico

const puntos2 = 50;
const estado = puntos2 >= 100 ? "VIP" : "Regular";

console.log("Estado del cliente:", estado);


let isLoggedIn;
const mensajeHome = isLoggedIn ? "Welcome back" : "Please login";
console.log(mensajeHome);


let isAdmin = true;

const mensajeHome2 = isLoggedIn && isAdmin
  ? "Admin Panel"
  : isLoggedIn
    ? "User panel"
    : "Login";

console.log(mensajeHome2);


// ============================================
// Caso práctico familiar
// ============================================

const tenerVacaciones = true;
const suficienteDinero = true;
const hijaGustaDisney = false;

let mensajeFamilia;

if (tenerVacaciones && suficienteDinero && hijaGustaDisney) {
  mensajeFamilia = "Nos vamos a Disney!";
} else if (tenerVacaciones && suficienteDinero) {
  mensajeFamilia = "Vamos a Murcia";
} else {
  mensajeFamilia = "No podemos ir a Disney AÚN";
}

console.log(mensajeFamilia);

console.clear();


// ============================================
// SWITCH
// ============================================

const role = "editor";

if (role === "admin") {
  console.log("Full access IF");
} else if (role === "editor") {
  console.log("Edit access IF");
} else if (role === "viewer") {
  console.log("Read access IF");
} else {
  console.log("No access");
}


// Refactor con switch

switch (role) {
  case "admin":
    console.log("Full access SWITCH");
    break;
  case "editor":
    console.log("Edit access SWITCH");
    break;
  case "viewer":
    console.log("Read access SWITCH");
    break;
  default:
    console.log("No access SWITCH");
}


// ============================================
// Ejemplo días de la semana
// ============================================

const dia = 5;
let diaDeLaSemana;

switch (dia) {
  case 1:
    diaDeLaSemana = "Lunes";
    break;
  case 2:
    diaDeLaSemana = "Martes";
    break;
  case 3:
    diaDeLaSemana = "Miércoles";
    break;
  case 4:
    diaDeLaSemana = "Jueves";
    break;
  case 5:
    diaDeLaSemana = "Viernes";
    break;
  case 6:
  case 7:
    diaDeLaSemana = "Fin de Semana!!!";
    break;
  default:
    diaDeLaSemana = "Día no válido";
}

console.log(diaDeLaSemana);


// ============================================
// Caso práctico calculadora
// ============================================

const num1 = 10;
const num2 = 5;
const operacion = "+";

let resultado;

switch (operacion) {
  case "+":
    resultado = num1 + num2;
    break;
  case "-":
    resultado = num1 - num2;
    break;
  case "*":
    resultado = num1 * num2;
    break;
  case "/":
    resultado = num1 / num2;
    break;
  default:
    resultado = "Operación no válida";
}

console.log(resultado);


// ============================================
// EJERCICIO FINAL
// ============================================

const productAName = "T-shirt";
const productAPrice = 20;
const productAQuantity = 2;

const productBName = "Cap";
const productBPrice = 35;
const productBQuantity = 1;

const productCName = "Socks";
const productCPrice = 10;
const productCQuantity = 3;

const total =
  (productAPrice * productAQuantity) +
  (productBPrice * productBQuantity) +
  (productCPrice * productCQuantity);

let aviso;

if (total < 50) {
  aviso = "Puedes agregar más productos";
} else if (total >= 50 && total <= 100) {
  aviso = "Estás cerca de tu límite de compra";
} else {
  aviso = "Has alcanzado el límite de tu compra";
}

console.log("El total es: " + total + " euros. " + aviso);