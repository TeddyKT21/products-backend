import jsonfile from "jsonfile"
const { readFile, writeFile } = jsonfile

export const FILE = 'Dal/products.json';

export const getProducts = async () => {
    const products = await readFile(FILE);
    return products;
}
export const getProduct = async (id) => {
    const products = await getProducts()
    return products.find(p => p.id === id);
}

export const deleteProduct = async (id) => {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index >= 0) {
        const deletedProduct = products[index];
        products.splice(index, 1);
        await overrideProducts(products);
        return deletedProduct;
    }
    else {
        throw new Error('product not found !');
    }
}


export const addProduct = async (product) => {
    const products = await getProducts();
    const newProduct = { ...product, id: products[products.length - 1]?.id + 1 }
    products.push(newProduct);
    await overrideProducts(products);
    return newProduct;
}

export const updateProduct = async (product, id) => {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index >= 0) {
        const oldProduct = products[index];
        products[index] = { ...oldProduct, ...product };
        await overrideProducts(products);
        return products[index];
    }
    else {
        throw new Error('product not found !');
    }
}

export const overrideProducts = async (products) => {
    await writeFile(FILE, products);
    return products;
}

 const  productsDal = { overrideProducts, addProduct, deleteProduct, updateProduct, getProduct, getProducts };
 export default productsDal;