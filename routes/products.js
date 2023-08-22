import express from 'express'
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct, changeQuantity } from '../controllers/products.js'
import { checkAdmin } from '../controllers/users.js';

const productsRouter = express.Router();

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProduct);

productsRouter.post('/',checkAdmin, addProduct);

productsRouter.put('/:id/:operator',checkAdmin, changeQuantity);

productsRouter.put('/:id',checkAdmin, updateProduct);

productsRouter.delete('/:id',checkAdmin, deleteProduct);


export default productsRouter;