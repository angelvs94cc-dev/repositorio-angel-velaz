import mongoose from 'mongoose';

// Usamos su estilo de variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export async function connectToDB() {
    try {
        // Metemos la conexión en un try por si internet o los puertos fallan
        const mongooseInstance = await mongoose.connect(MONGODB_URI, { 
            dbName: process.env.DB_NAME || 'keepcoding' 
        });
        console.log("Connected to MongoDB Atlas successfully");
        return mongooseInstance.connection;
    } catch (error) {
        console.log('---------------------------------------------------------');
        console.log('⚠️ ADVERTENCIA: No se pudo conectar a MongoDB en la nube.');
        console.log('El servidor Express arrancará igual para que puedas ver la web,');
        console.log('pero el catálogo podría estar vacío por un bloqueo de red.');
        console.log('---------------------------------------------------------');
        
        // Retornamos una conexión simulada o vacía para que www.js no se rompa
        return mongoose.connection;
    }
}