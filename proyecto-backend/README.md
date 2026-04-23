# Guia del Proyecto Backend - KeepCoding

Este proyecto es el motor de una aplicacion. Es la logica que hay detras para que los datos de usuarios y tareas se guarden y se gestionen bien. Aqui explico que es cada cosa de forma sencilla:

## ¿Que piezas tiene este motor?

Para que alguien que no sabe de programacion lo entienda, estas son las herramientas (dependencias) que he instalado y para que sirven:

1. **Express**: Es el esqueleto del servidor. Decide que pasa cuando alguien entra en una direccion de nuestra web.
2. **Mongoose**: Es el traductor. Ayuda a que el servidor hable con la base de datos (MongoDB) y que los datos esten ordenados.
3. **Bcrypt**: Es el guardaespaldas. Tritura las contraseñas para que, si alguien entra en la base de datos, no pueda ver las claves reales, solo codigos raros.
4. **Morgan**: Es el cotilla. Anota en la pantalla todo lo que pasa en el servidor (quien entra, que pide, si hay fallos) para que podamos vigilarlo.
5. **EJS**: Es el dibujante. Aunque esto es backend, EJS nos permite pintar paginas web basicas usando datos del servidor.
6. **Express-Session y Connect-Mongo**: Son la memoria a largo plazo. Permiten que el servidor "recuerde" que ya has puesto tu contraseña y no te la pida en cada pagina.
7. **Dotenv**: Es la caja fuerte. Permite leer el archivo .env donde guardamos las contraseñas de la base de datos sin enseñarselas a todo el mundo en GitHub.

## Como ponerlo en marcha (Paso a paso)

Sigue estos pasos para que el proyecto funcione en tu ordenador:

1. **Instalar las herramientas**: Abre la carpeta en tu terminal y escribe:
   npm install
   (Esto descarga todas las piezas mencionadas arriba).

2. **Configurar la conexion (.env)**: Crea un archivo llamado .env en la carpeta principal. Copia lo que hay en .env.example y pon la direccion de tu base de datos de MongoDB Atlas.

3. **Limpiar y rellenar datos (Seed)**: Para borrar lo que haya en la base de datos y meter los usuarios de prueba (como Joe Don y el Admin), ejecuta:
   npm run seed:database

4. **Encender el motor**: Para que el servidor empiece a funcionar:
   npm run dev

## Notas sobre posibles fallos de red
Si al intentar conectar te sale un error tipo "ECONNREFUSED" o "ENOTFOUND", no es que el codigo este roto. Es un problema de DNS: tu router o tu internet estan bloqueando el camino hacia la base de datos de MongoDB Atlas. 

El codigo esta diseñado para detectar este problema de red y avisarte, siguiendo los estandares de seguridad y buenas practicas que hemos dado en clase.