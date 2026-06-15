import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'products.json');

// Función auxiliar para leer el archivo JSON local de forma segura
async function readData() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe o está vacío, devolvemos unos productos por defecto chulos
        const defaultProducts = [
            {
                "_id": "1",
                "name": "iPhone 15 Pro",
                "price": 999,
                "tags": ["mobile", "lifestyle"],
                "owner": "user123"
            },
            {
                "_id": "2",
                "name": "Seat Ibiza",
                "price": 4500,
                "tags": ["motor"],
                "owner": "user456"
            },
            {
                "_id": "3",
                "name": "MacBook Pro M3",
                "price": 1800,
                "tags": ["work", "mobile"],
                "owner": "user123"
            }
        ];
        await fs.writeFile(filePath, JSON.stringify(defaultProducts, null, 2), 'utf-8');
        return defaultProducts;
    }
}

// 1. Obtener productos con filtros aplicados (Lo que pide tu controlador)
export async function getProducts(filters = {}, options = {}) {
    let products = await readData();

    if (filters.name) {
        products = products.filter(p => p.name.toLowerCase().includes(filters.name.toLowerCase()));
    }
    if (filters.tag && filters.tag !== "") {
        products = products.filter(p => p.tags.includes(filters.tag));
    }
    if (filters.price_min) {
        products = products.filter(p => p.price >= Number(filters.price_min));
    }
    if (filters.price_max) {
        products = products.filter(p => p.price <= Number(filters.price_max));
    }

    return products;
}

// 2. Obtener por ID
export async function getProductById(id) {
    const products = await readData();
    return products.find(p => p._id === id) || null;
}

// 3. Añadir nuevo producto
export async function addNewProduct(productData) {
    const products = await readData();
    const newProduct = {
        _id: String(Date.now()),
        ...productData
    };
    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
    return newProduct;
}

// 4. Actualizar producto
export async function updateProduct(id, productData, userId) {
    const products = await readData();
    const index = products.findIndex(p => p._id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...productData };
    await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
    return products[index];
}

// 5. Eliminar producto
export async function deleteProduct(id, userId) {
    const products = await readData();
    const index = products.findIndex(p => p._id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
    return true;
}