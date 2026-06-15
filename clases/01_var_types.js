// ============================================
// CLASE 01 - INTRODUCCIÓN A JAVASCRIPT
// Variables y Tipos de Datos
// ============================================

/*
JavaScript es un lenguaje de programación que permite dar vida 
e interactividad a las páginas web.

LOS TRES PILARES DEL DESARROLLO WEB:

HTML  →  Estructura (los huesos)
CSS   →  Estilos (la piel y la ropa)
JS    →  Interactividad (el cerebro)

CARACTERÍSTICAS:
- Lenguaje interpretado
- Orientado a eventos
- Dinámico y flexible
- Multiplataforma (funciona en cualquier navegador)

IMPORTANTE: JavaScript ≠ Java (son lenguajes diferentes)
*/

console.log("Hola Keepcoding");
console.log(" === 01. VARIABLES Y TIPOS DE DATOS ===");


// ============================================
// 1. DECLARACIÓN Y ASIGNACIÓN
// ============================================

/*
Una variable es como una "caja" donde guardamos información.
*/

// LET → Caja que puede cambiar
let nombre = "Angel";
let apellido = "Velaz";

console.log("Nombre individual:", nombre);
console.log("Apellido individual:", apellido);
console.log("Nombre completo:", nombre, apellido);

// Podemos cambiar su valor
let modulo = "Intro JS";
console.log("Módulo actual:", modulo);

modulo = "HTML y CSS";
console.log("Módulo después de cambiarlo:", modulo);


// CONST → Caja con candado (no puede cambiar)
const edad = 30;
console.log("Edad (constante):", edad);

// edad = 31; ❌ ERROR (no se puede cambiar)

const MAX_RETRY = 3; // Las constantes fijas se escriben en MAYÚSCULAS


// VAR → Forma antigua (NO usar)
var ciudad = "Alcorcón";
console.log("Ciudad (usando var, pero evítalo):", ciudad);

/*
¿CUÁNDO USAR CADA UNA?

Usa CONST por defecto.
Usa LET cuando el valor vaya a cambiar.
Evita VAR (tiene problemas de hoisting).
*/


// ============================================
// 2. REGLAS DE NOMBRADO
// ============================================

let miNombre = "Ángel";   // camelCase (RECOMENDADO)
let mi_nombre = "Pepe";   // snake_case
let nombre3 = "Juan";     // números permitidos (no al inicio)
let _privado = "secreto"; 
let $precio = 23;

/*
INVÁLIDOS:
let 2nombre = "error";
let mi-nombre = "error";
const let = "error";
*/


// ============================================
// 3. TIPOS DE DATOS PRIMITIVOS
// ============================================

/*
1. Number
2. String
3. Boolean
4. Undefined
5. Null
6. BigInt
7. Symbol
*/

// -------- NUMBER --------
console.log("--- Tipo Number ---");

const entero = 42;
const decimal = 34.1;
const negativo = -7;
const grande = 1000000;

console.log("Entero:", entero);
console.log("Decimal:", decimal);
console.log("Infinito:", Infinity);
console.log("NaN:", NaN); // Not a Number

// BigInt (para números muy grandes)
const numeroGigante = 123456789012345678901234567890n;
console.log("BigInt:", numeroGigante);


// -------- STRING --------
console.log("--- Tipo String ---");

const name1 = "Miriam";
const apellido2 = 'San Antonio';
const frase = "Hola a todos mi nombre es Italo";
let stringVacio = "";

console.log("Frase:", frase);


// Template Literals (forma moderna)
const nombreCompleto = "Laura Martinez";
const edadPersona = 28;

// Forma antigua (concatenación)
console.log("Hola mi nombre es " + nombreCompleto + " y tengo " + edadPersona + " años");

// Forma moderna (backticks)
const mensaje = `Hola mi nombre es ${nombreCompleto} y tengo ${edadPersona} años`;
console.log(mensaje);


// -------- BOOLEAN --------
console.log("--- Tipo Boolean ---");

const esVerdadero = true;
const esFalso = false;

console.log("¿Es verdadero?:", esVerdadero);


// -------- UNDEFINED --------
let sinValor;
console.log("Variable sin valor:", sinValor); // undefined


// -------- NULL --------
let valorNulo = null;
console.log("Valor nulo:", valorNulo);

/*
DIFERENCIA:

undefined → JavaScript dice: "No tiene valor".
null → Tú dices: "Quiero que esté vacío".

IMPORTANTE:
typeof null devuelve "object" (es un error histórico del lenguaje).
*/


// ============================================
// 4. TYPEOF (El detective de tipos)
// ============================================

console.log("--- TYPEOF ---");

console.log(typeof 42);        // number
console.log(typeof "Hola");    // string
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined
console.log(typeof null);      // object (bug histórico)

let valueNull = null;
console.log("¿Es realmente null?:", valueNull === null);


// ============================================
// 5. COMPARACIONES (MUY IMPORTANTE)
// ============================================

/*
==  → Compara valor (convierte tipos)
=== → Compara valor Y tipo (RECOMENDADO)
*/

console.log(5 == "5");   // true (convierte)
console.log(5 === "5");  // false (mejor usar esta)


// ============================================
// 6. CONVERSIÓN DE TIPOS
// ============================================

// String a Number
const textoNumero = "42";
const numeroConvertido = Number(textoNumero);
console.log("Convertido a número:", numeroConvertido);

// parseInt y parseFloat
const numeroTexto = "50.99";
console.log(parseInt(numeroTexto));   // 50
console.log(parseFloat(numeroTexto)); // 50.99

// Number a String
const valorAString = String(100);
console.log("Convertido a texto:", valorAString);


// Coerción automática
console.log("'5' + 3 =", "5" + 3); // "53"
console.log("'5' - 3 =", "5" - 3); // 2
console.log("'5' * 2 =", "5" * 2); // 10


// ============================================
// 7. CASO PRÁCTICO - VALIDACIÓN
// ============================================

const nombreInput = "Ana Garcia";
const edadInput = 25;
const onlineInput = true;

console.log("Validando datos...");
console.log("¿Nombre es texto?:", typeof nombreInput === "string");
console.log("¿Edad es número?:", typeof edadInput === "number");
console.log("¿Está online?:", typeof onlineInput === "boolean");


// ============================================
// 8. EJERCICIO - PRODUCTO
// ============================================

let nombreDelProducto = "ProductoJava";
let precio = 1000;
const disponible = true;
let cantidadEnStock = 4447;

console.log("--- Datos del Producto ---");
console.log("Nombre:", nombreDelProducto);
console.log("Precio:", precio);
console.log("Disponible:", disponible);
console.log("Stock:", cantidadEnStock);
