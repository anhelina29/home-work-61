const ProductModel = require('../../models/products')

const getProductList = async (productData, projection) => {
    const products = await ProductModel.find(productData, projection)
    return products
}

const getProductById = async (productId) => {
    const product = await ProductModel.findById(productId)
    return product
}

const postProduct = async (productData) => {
    const newProduct = await ProductModel.create(productData)
    return newProduct
}

const createProducts = async (productsData) => {
    const products = await ProductModel.insertMany(productsData)
    return products
}

const putProductById = async (productId, productData) => {
    const product = await ProductModel.findByIdAndUpdate(productId, { $set: productData }, { new: true })
    return product
}

const updateProducts = async (filter, update) => {
    const products = await ProductModel.updateMany(filter, update)
    return products
}

const deleteProductById = (productId) => {
    return ProductModel.findByIdAndDelete(productId)
}

const deleteProducts = (productData) => {
    return ProductModel.deleteMany(productData)
}

module.exports = {
    getProductList,
    getProductById,
    postProduct,
    createProducts,
    putProductById,
    updateProducts,
    deleteProductById,
    deleteProducts
}
