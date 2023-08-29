import express from 'express';
import {getProductsFromAPI} from './services/httpRequests.js'
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import cors from 'cors'
import morgan from "morgan"


const app = express();

app.use(cors({origin:['https://stellular-chimera-05c398.netlify.app','https://64ec7f6ebf89b70008f13487--stellular-chimera-05c398.netlify.app']}));
app.use(morgan("combined"));
app.use(express.json());
app.use('/products',productsRouter);
app.use('/users',usersRouter);


const PROT = 8070;

app.listen(PROT,async () =>{
    await getProductsFromAPI();
    console.log(`app is listening on port ${PROT}`);
})