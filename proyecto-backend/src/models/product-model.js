import mongoose, { Schema } from 'mongoose';
import { MODELS } from './models.js';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0, // El precio no puede ser negativo
        },
        tags: {
            type: [String], // Es un array de strings (puede tener uno o varios)
            required: true,
            enum: ['work', 'lifestyle', 'motor', 'mobile'], // Solo permite estos 4 tags
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: MODELS.USER,
            required: true, // Cada producto tiene que tener un dueño obligado
        }
    },
    {
        timestamps: true, // Esto te guarda la fecha de creación automáticamente
    }
);


export const Product = mongoose.models.Product || mongoose.model(MODELS.PRODUCT, productSchema);