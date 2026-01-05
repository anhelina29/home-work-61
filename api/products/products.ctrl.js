const { randomUUID } = require('crypto');

const products = [
    { id: 11, title: 'Product 1' },
    { id: 12, title: 'Product 2' },
    { id: 13, title: 'Product 3' },
    { id: 14, title: 'Product 4' },
    { id: 15, title: 'Product 5' },
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
    const {id} = req.params;
    const updatedProduct = {
        id,
        ...req.body,
    }
    res.status(200).json({data: updatedProduct})
}

const deleteProductByIdHandler = (req, res) => {
    const {id} = req.params;
    res.status(200).json({data: `Delete product by id - ${id}`})
}

module.exports = {
    getProductsHandler,
    postProductsHandler,
    getProductByIdHandler,
    postProductByIdHandler,
    putProductByIdHandler,
    deleteProductByIdHandler,
}