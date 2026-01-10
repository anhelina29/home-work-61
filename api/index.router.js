const express = require('express');
const router = express.Router();

router.use('/users', require('./users/users.router'));
router.use('/products', require('./products/products.router'));
router.use('/orders', require('./orders/orders.router'));
router.use('/theme', require('./common/theme/theme.router'));

module.exports = router;

