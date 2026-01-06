const express = require('express');
const router = express.Router();

router.use('/users', require('./users/users.router'));
router.use('/products', require('./products/products.router'));

module.exports = router;

