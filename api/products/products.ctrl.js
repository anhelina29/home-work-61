const { randomUUID } = require('crypto');

let products = [
    { id: 11, title: 'Wireless Mouse' },
    { id: 12, title: 'Mechanical Keyboard' },
    { id: 13, title: 'USB-C Charger' },
    { id: 14, title: 'Bluetooth Headphones' },
    { id: 15, title: 'Laptop Stand' },
]

const getProductsHandler = (req, res) => {
    res.status(200).json({data: products})
}

const postProductsHandler = (req, res) => {
    const { title } = req.body
    const newProduct = {
        id: randomUUID(),
        title: title,
    }
    res.status(201).json({data: newProduct})
}

const getProductByIdHandler = (req, res) => {
    const {id} = req.params;
    const product = products.find(product => product.id.toString() === id.toString());
    res.status(200).json({data: product})
}

const postProductByIdHandler = (req, res) => {
    const {id} = req.params;
    res.status(200).json({data: `Post product by id - ${id}`})
}

const putProductByIdHandler = (req, res) => {
    const productId = req.params.id;
    const { title } = req.body
    const product = products.find(product => product.id.toString() === productId.toString());
    
    if (!product) {
        return res.status(404).json({data: `Product with id ${productId} not found`});
    }

    product.title = title
    res.status(200).json({data: product})
}

const deleteProductByIdHandler = (req, res) => {
    const productId = req.params.id;
    const product = products.find(product => product.id.toString() === productId.toString());
    
    if (!product) {
        return res.status(404).json({data: `Product with id ${productId} not found`});
    }

    products = products.filter(product => product.id.toString() !== productId.toString());
    return res.status(200).json({data: `Delete product by id - ${id}`})
}

module.exports = {
    products,
    getProductsHandler,
    postProductsHandler,
    getProductByIdHandler,
    postProductByIdHandler,
    putProductByIdHandler,
    deleteProductByIdHandler,
}