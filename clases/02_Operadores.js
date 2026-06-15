// ============================================
// CLASE 02 - OPERADORES
// ============================================

console.log(" === 02. OPERADORES === ");

/*
Los OPERADORES son símbolos que nos permiten realizar operaciones
con valores y variables.

TIPOS DE OPERADORES:
1. Aritméticos
2. Asignación
3. Comparación
4. Lógicos
5. Incremento y decremento
*/


// ============================================
// 1. OPERADORES ARITMÉTICOS
// ============================================

// SUMA (+)
const suma = 5 + 3;
console.log("5 + 3 =", suma);

const precio1 = 100;
const precio2 = 5;
const total = precio1 + precio2;
console.log("Total:", total);

// RESTA (-)
const resta = 10 - 4;
console.log("10 - 4 =", resta);

const saldo = 1000;
const gasto = 2500;
const saldoRestante = saldo - gasto;
console.log("Saldo restante:", saldoRestante); // Puede ser negativo

// MULTIPLICACIÓN (*)
const multiplicacion = 5 * 4;
console.log("5 * 4 =", multiplicacion);

// DIVISIÓN (/)
const division = 20 / 4;
console.log("20 / 4 =", division);

// MÓDULO (%) → Devuelve el resto de la división
const modulo = 10 % 3;
console.log("10 % 3 =", modulo);

// Caso práctico: ¿Es par?
const numero = 17;
const esPar = numero % 2 === 0;
console.log("¿17 es par?:", esPar);

// POTENCIA (**)
const potencia = 2 ** 3;
console.log("2 ** 3 =", potencia);


/*
ORDEN DE PRIORIDAD:
1. ()
2. **
3. *, /, %
4. +, -
*/


// ============================================
// 2. OPERADORES DE ASIGNACIÓN
// ============================================

// ASIGNACIÓN SIMPLE (=)
let x = 10;
console.log("Valor inicial de x:", x);

// ASIGNACIÓN CON SUMA (+=)
let puntos = 100;
puntos += 50; // puntos = puntos + 50
console.log("Después de += 50:", puntos);

// ASIGNACIÓN CON RESTA (-=)
let vidas = 5;
vidas -= 2; // vidas = vidas - 2
console.log("Después de -= 2:", vidas);

// ASIGNACIÓN CON MULTIPLICACIÓN (*=)
let valor = 10;
valor *= 3;
console.log("Después de *= 3:", valor);

// ASIGNACIÓN CON DIVISIÓN (/=)
let cantidad = 100;
cantidad /= 4;
console.log("Después de /= 4:", cantidad);


// ============================================
// 3. OPERADORES DE COMPARACIÓN
// ============================================

// IGUALDAD DÉBIL (==) → Convierte tipos
console.log("5 == '5':", 5 == "5"); // true

// IGUALDAD ESTRICTA (===) → Compara valor y tipo
console.log("5 === '5':", 5 === "5"); // false

/*
IMPORTANTE:
Usar siempre === para evitar errores.
*/

// DESIGUALDAD
console.log("5 != 3:", 5 != 3);
console.log("5 !== '5':", 5 !== "5");

// MAYOR Y MENOR
console.log("5 > 3:", 5 > 3);
console.log("10 >= 10:", 10 >= 10);

// CASO PRÁCTICO
const edadUsuario = 17;
const esMayor = edadUsuario >= 18;
console.log(`¿Con ${edadUsuario} años es mayor de edad?:`, esMayor);


// ============================================
// 4. OPERADORES LÓGICOS
// ============================================

// AND (&&) → Todas deben ser true
const tieneEdad = true;
const tienePermiso = true;
const puedeEntrar = tieneEdad && tienePermiso;
console.log("¿Puede entrar?:", puedeEntrar);

// OR (||) → Con que una sea true
const esAdmin = false;
const esModerador = true;
const esUser = false;
const tieneAcceso = esAdmin || esModerador || esUser;
console.log("¿Tiene acceso?:", tieneAcceso);

// NOT (!)
const estaLogueado = false;
console.log("¿No está logueado?:", !estaLogueado);


// ============================================
// 5. INCREMENTO Y DECREMENTO
// ============================================

let contador = 0;
console.log("Contador inicial:", contador);

contador++;
contador++;
console.log("Contador después de ++:", contador);

// Decremento
let vidas2 = 5;
vidas2--;
vidas2--;
console.log("Vidas después de --:", vidas2);

// Diferencia entre post y pre incremento
let a = 5;
console.log("a++:", a++); // muestra 5 y luego incrementa
console.log("a después:", a);

let b = 5;
console.log("++b:", ++b); // incrementa primero
console.log("b final:", b);




