const express = require('express');
const router = express.Router();
const productCtrl = require('./products.ctrl');
const productsValidator = require('./productsValidator');
const productAccess = require('./productsAccess');

router.get('/', productCtrl.getProductsHandler)
router.get('/:id', productCtrl.getProductByIdHandler)
router.post('/', productsValidator.postProductsValidator, productCtrl.postProductByIdHandler)
router.post('/:id', productAccess, productsValidator.putProductsValidator, productCtrl.putProductByIdHandler)
router.put('/:id', productAccess, productsValidator.putProductsValidator, productCtrl.putProductByIdHandler)
router.delete('/:id', productAccess, productCtrl.deleteProductByIdHandler)

module.exports = router;