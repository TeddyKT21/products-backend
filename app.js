import express from 'express';
import {getProductsFromAPI} from './services/httpRequests.js'
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
const app = express();
app.use(express.json());
app.use('/products',productsRouter);
app.use('/users',usersRouter);


const PROT = 8070;

app.listen(PROT,async () =>{
    await getProductsFromAPI();
    console.log(`app is listening on port ${PROT}`);
})