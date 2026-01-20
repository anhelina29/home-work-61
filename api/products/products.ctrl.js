const ProductService = require('./products.service')

const projection = {
    _id: 0,
    name: 1,
    price: 1,
    stock: 1
}

const getProductsHandler = async (req, res) => {
    const products = await ProductService.getProductList({ price: { $gt: 150 } }, projection)
    res.status(200).json({ data: products })
}

const getProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductService.getProductById(productId);

    if (!product) {
        return res.status(404).json({ data: `Product with id ${productId} not found` });
    }

    res.status(200).json({ data: product })
}

const postProductsHandler = async (req, res) => {
    const { name, description, price, stock } = req.body
    const newProduct = await ProductService.postProduct({
        name: name,
        description: description,
        price: price,
        stock: stock
    })
    res.status(201).json({ newProduct })
}

const createProductsHandler = async (req, res) => {
    const products = await ProductService.createProducts(req.body)
    res.status(201).json({ data: products })
}

const putProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const { price, stock } = req.body
    const product = await ProductService.putProductById(productId, { price, stock })

    if (!product) {
        return res.status(404).json({ data: `Product with id ${productId} not found` });
    }

    res.status(200).json({ data: product })
}

const updateProductsHandler = async (req, res) => {
    const products = await ProductService.updateProducts({ stock: 0 }, { isActive: false })
    res.status(200).json({ data: `Update products with stock = 0` })
}

const deleteProductByIdHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductService.deleteProductById(productId)

    if (!product) {
        return res.status(404).json({ data: `Product with id ${productId} not found` });
    }

    return res.status(200).json({ data: `Delete product by id - ${productId}` })
}

const deleteProductsHandler = async (req, res) => {
    const products = await ProductService.deleteProducts({ isActive: false })
    res.status(200).json({ data: `Delete products with isActive = false` })
}


const renderProducts = async (req, res) => {
    const products = await ProductService.getProductList()
    const data = {
        title: 'Products',
        products: products,
        product: null
    }
    res.render('products.ejs', data);
}

const renderProductsById = async (req, res) => {
    const productId = req.params.id
    const product = await ProductService.getProductById(productId)
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