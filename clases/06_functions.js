console.log("Funciones");

// ==================================================
// Declaración de funciones
// ==================================================
function saludo() {
    console.log("Hola y bienvenido a Keepcoding");
}

saludo();

// ==================================================
// Funciones con parámetros
// ==================================================
function saludarUsuario(nombre) {
    console.log(`Hola, ${nombre}, bienvenido!!`);
}

saludarUsuario("Alicia");
saludarUsuario("Zoe");
saludarUsuario("Guille");

// ==================================================
// Calcular precio con descuento
// ==================================================
function calcularDescuento(precio, descuento) {
    if(descuento === 100) {
        console.log("Enhorabuena, este producto es gratis");
        return;
    }
    const precioFinal = precio - (precio * descuento / 100);
    console.log(`Precio original: ${precio} €. Descuento: ${descuento} %. Precio final: ${precioFinal} €`);
}

calcularDescuento(100, 10);
calcularDescuento(100, 25);
calcularDescuento(95, 100);

// ==================================================
// RETURN
// ==================================================
function mostrarTotal(precio, cantidad) {
    console.log(precio * cantidad);
}

mostrarTotal(10, 3);

let invoice1 = mostrarTotal(10, 3);
console.log("invoice1", invoice1); // undefined

// Correcto con return
function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

let invoice2 = calcularTotal(10, 3);
console.log("invoice2", invoice2);

let subtotal = calcularTotal(10, 3);
let tax = subtotal * 0.21;
let total = subtotal + tax;

console.log(`Subtotal: ${subtotal} €. Tax: ${tax.toFixed(2)}. Total: ${total.toFixed(2)}`);

// ==================================================
// Verificador de contraseña
// ==================================================
function comprobarPassword(password) {
    if (password.length < 8) return "Contraseña muy corta!";
    
    let hasNumber = /\d/.test(password); // Regex más limpio para números
    if (!hasNumber) return "La contraseña debe tener al menos un número";
    
    const hasUpperCase = password !== password.toLowerCase();
    if (!hasUpperCase) return "Contraseña debe tener al menos una mayúscula";

    return "Contraseña es válida";
}

console.log(comprobarPassword("abc"));
console.log(comprobarPassword("abcdefghc"));
console.log(comprobarPassword("abcdefgh1"));
console.log(comprobarPassword("Abcdefg1"));

// ==================================================
// Early return
// ==================================================
function ejemploVacio() {
    console.log("Paso 1");
    return;
    console.log("Paso 2"); // nunca se ejecuta
}

ejemploVacio();

function validarEdad(edad) {
    if (edad < 18) {
        console.log("Eres menor de edad");
        return;
    }
    console.log("Puedes continuar");
}

validarEdad(15);
validarEdad(25);

// ==================================================
// Procesar pago con early return
// ==================================================
function procesarPago(cantidad) {
    if (cantidad <= 0) return "Cantidad inválida";
    if (cantidad > 1000) return "No puedo procesar tanto dinero";
    return `Procesando pago de ${cantidad} €`;
}

console.log(procesarPago(0));
console.log(procesarPago(3000));
console.log(procesarPago(400));

// ==================================================
// Scope (Ámbito)
// ==================================================
let appName = "Plataforma Keepcoding";
let maxLoginAttempts = 3;

function showAppInfo() {
    console.log(`App Name: ${appName}`);
    console.log(`Max login attempts: ${maxLoginAttempts}`);
}

showAppInfo();

// Contador de login local (se reinicia)
function validarLogin(username, password) {
    let attempts = 0;
    let correctPassword = "secret123";

    attempts++;

    if (attempts > maxLoginAttempts) return "Cuenta bloqueada - demasiados intentos";

    return password === correctPassword
        ? `Bienvenido ${username}, intentos de login ${attempts}`
        : `Contraseña incorrecta, intentos de login: ${attempts}`;
}

console.log(validarLogin("Miriam", "wrong"));
console.log(validarLogin("Miriam", "wrong2"));
console.log(validarLogin("Miriam", "secret123"));

// ==================================================
// Funciones Flecha (Arrow Functions)
// ==================================================
const saludarFlecha = nombre => "Hola " + nombre;
console.log(saludarFlecha("Juanito"));

const sumar = (a, b) => a + b;
console.log(sumar(10, 5));

const mostrarMensaje = () => console.log("Hola Mundo");
mostrarMensaje();

const esAdulto = age => age >= 18;
console.log("es adulto:", esAdulto(15));

const esEmailValido = email => email.includes("@") && email.includes(".");
console.log("email es válido", esEmailValido("test@email.com"));

const esVacio = string => string.trim().length === 0;
console.log("es vacío", esVacio("  "));

// ==================================================
// IIFE (Inmediately Invoked Function Expression)
// ==================================================
(function() {
    console.log("Esta función se ejecuta automáticamente");
})();

(function(nombre) {
    console.log(`Hola ${nombre}`);
})("Augusto");

const usuario = "Carlos";
(function(nombre) {
    console.log("Iniciando sesión para " + nombre);
    console.log(nombre === "Carlos" ? "Acceso concedido" : "Acceso denegado");
})(usuario);

// ==================================================
// Mini Sistema de Reserva Hotel
// ==================================================
const nombreCliente = "Laura";
const noches = 3;
const precioPorNoche = 100;
const codigoDescuento = "DESC10";

const validarNombre = nombre => nombre.trim().length > 3;
const esMayorQueCero = valor => valor > 0;
const calcularPrecioFinal = (noches, precio, codigo) => {
    let total = noches * precio;
    if(codigo === "DESC10") total *= 0.9;
    return total;
};

const validarReserva = (nombre, noches, precio, codigo) => {
    if(!validarNombre(nombre)) return "Nombre no válido";
    if(!esMayorQueCero(noches)) return "Número de noches inválido";
    if(!esMayorQueCero(precio)) return "Precio inválido";

    const precioFinal = calcularPrecioFinal(noches, precio, codigo);
    return `Reserva confirmada. Total a pagar: ${precioFinal}€`;
};

console.log(validarReserva(nombreCliente, noches, precioPorNoche, codigoDescuento));