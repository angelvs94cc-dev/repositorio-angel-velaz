import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { MODELS } from './models.js';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String, 
            select: false,
        }
    },
    {
        timestamps: true,
    }
);

// Método estático para encriptar
userSchema.statics.hashPassword = (clearPassword) => {
    return hash(clearPassword, 7);
}

// Método de instancia para comparar contraseñas
userSchema.methods.comparePassword = function(plainPassword) {
    return compare(plainPassword, this.password);
}

export const User = mongoose.models.User || mongoose.model(MODELS.USER, userSchema);