import axios from "axios"
import { FILE, overrideProducts } from "../Dal/products.js";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getProductsFromAPI = async () => {
    const location = path.join(__dirname,'..',FILE)
    if (existsSync(location)) return;
    const res = await axios.get('https://fakestoreapi.com/products');
    const products = res.data;
    products.forEach(product => product.quantity = Math.floor(Math.random()* 1000));
    console.log(products);
    return await overrideProducts(products); 
}