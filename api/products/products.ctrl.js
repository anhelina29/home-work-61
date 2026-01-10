const ProductModel = require('../../models/products');

const getProductsHandler = async (req, res) => {
    const products = await ProductModel.find()
    res.status(200).json({data: products})
}

const getProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    
    if (!product) {
        return res.status(404).json({data: `Product with id ${productId} not found`});
    }
    
    res.status(200).json({data: product})
}

const postProductsHandler = async (req, res) => {
    const { name, description, price, stock } = req.body
    const newProduct = await ProductModel.create({
        name: name,
        description: description,
        price: price,
        stock: stock
    })
    res.status(201).json({newProduct})
}

const putProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const { price, stock } = req.body
    const product = await ProductModel.findById(productId)
    
    if (!product) {
        return res.status(404).json({data: `Product with id ${productId} not found`});
    }

    product.price = price
    product.stock = stock

    res.status(200).json({data: product})
}

const deleteProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId)
    
    if (!product) {
        return res.status(404).json({data: `Product with id ${productId} not found`});
    }

    await ProductModel.deleteOne({ _id: productId })
    
    return res.status(200).json({data: `Delete product by id - ${productId}`})
}

const renderProducts = async (req, res) => {
    const products = await ProductModel.find()
    const data = {
        title: 'Products',
        products: products,
        product: null
    }
    res.render('products.ejs', data);
}

const renderProductsById = async (req, res) => {
    const productId = req.params.id
    const product = await ProductModel.findById(productId)
    const data = {
        title: 'Products',
        product: product,
        products: null
    }
    res.render('products.ejs', data);
}

module.exports = {
    getProductsHandler,
    postProductsHandler,
    getProductByIdHandler,
    putProductByIdHandler,
    deleteProductByIdHandler,
    renderProducts,
    renderProductsById
}