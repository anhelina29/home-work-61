const ProductModel = require('../../models/products');

const projection = {
    _id: 0,
    name: 1,
    price: 1,
    stock: 1
}

const getProductsHandler = async (req, res) => {
    const products = await ProductModel.find({ price: { $gt: 150 } }, projection)
    res.status(200).json({ data: products })
}

const getProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    if (!product) {
        return res.status(404).json({ data: `Product with id ${productId} not found` });
    }

    res.status(200).json({ data: product })
}

const postProductsHandler = async (req, res) => {
    const { name, description, price, stock } = req.body
    const newProduct = await ProductModel.create({
        name: name,
        description: description,
        price: price,
        stock: stock
    })
    res.status(201).json({ newProduct })
}

const createProductsHandler = async (req, res) => {
    const products = await ProductModel.insertMany(req.body)
    res.status(201).json({ data: products })
}

const putProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const { price, stock } = req.body
    const product = await ProductModel.findByIdAndUpdate(productId, { $set: { price, stock } }, { new: true })

    if (!product) {
        return res.status(404).json({ data: `Product with id ${productId} not found` });
    }

    res.status(200).json({ data: product })
}

const updateProductsHandler = async (req, res) => {
    const products = await ProductModel.updateMany({ stock: 0 }, { $set: { isActive: false } })
    res.status(200).json({ data: `Update products with stock = 0` })
}

const deleteProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findByIdAndDelete(productId)

    if (!product) {
        return res.status(404).json({ data: `Product with id ${productId} not found` });
    }

    return res.status(200).json({ data: `Delete product by id - ${productId}` })
}

const deleteProductsHandler = async (req, res) => {
    const products = await ProductModel.deleteMany({ isActive: false })
    res.status(200).json({ data: `Delete products with isActive = false` })
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
    createProductsHandler,
    getProductByIdHandler,
    putProductByIdHandler,
    updateProductsHandler,
    deleteProductsHandler,
    deleteProductByIdHandler,
    renderProducts,
    renderProductsById
}