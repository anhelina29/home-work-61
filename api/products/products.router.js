const express = require('express');
const router = express.Router();
const productCtrl = require('./products.ctrl');
const productsValidator = require('./productsValidator');
const authMiddleware = require('../common/middlewares/auth');

router.get('/', authMiddleware.checkAuth, productCtrl.getProductsHandler)
router.get('/render', productCtrl.renderProducts);
router.get('/render/:id', productCtrl.renderProductsById)
router.get('/:id', authMiddleware.checkAuth, productCtrl.getProductByIdHandler)
router.post('/', authMiddleware.checkAuth, productsValidator.postProductsValidator, productCtrl.postProductsHandler)
router.put('/:id', authMiddleware.checkAuth, productsValidator.putProductsValidator, productCtrl.putProductByIdHandler)
router.delete('/:id', authMiddleware.checkAuth, productCtrl.deleteProductByIdHandler)

module.exports = router;