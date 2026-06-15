import express from 'express';
import { 
    createProductController, 
    productsPageController, 
    newProductController, 
    productDetailController, 
    editProductController, 
    deleteProductController 
} from '../controllers/products-controllers.js';
import { guard } from '../middleware/auth-middleware.js';

export const productsRouter = express.Router();

productsRouter.get('/new', guard, newProductController);
productsRouter.post('/', guard, createProductController);
productsRouter.get('/', productsPageController);
productsRouter.get('/:productId', productDetailController);
productsRouter.post('/edit/:productId', guard, editProductController);
productsRouter.delete('/:productId', guard, deleteProductController);