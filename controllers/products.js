import productDal from "../Dal/products.js";

export const getProducts = async (req, res) => {
    try {
        const products = await productDal.getProducts();
        res.status(200).send(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await productDal.getProduct(id);
        res.status(200).send(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await productDal.deleteProduct(id);
        res.status(200).send(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { product } = req.body;
        const id = Number(req.params.id);
        const updatedProduct = await productDal.updateProduct(product, id);
        res.status(202).send(updatedProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export const addProduct = async (req, res) => {
    try {
        const { product } = req.body;
        const newProduct = await productDal.addProduct(product);
        res.status(201).send(newProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export const changeQuantity = async (req, res) => {
    try {
        const { operator, id } = req.params;
        const product = await productDal.getProduct(Number(id));
        if (!product) {
            res.status(400).send('product not found !');
            return;
        }
        if (operator !== '+' && operator !== '-') {
            res.status(400).send('invalid operation !');
            return;
        }
        operator === '+' ? product.quantity += 1 : product.quantity -= 1;
        await productDal.updateProduct(product, Number(id));
        res.status(202).send(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

}
