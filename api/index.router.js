const express = require('express');
const router = express.Router();

router.use('/users', require('./users/users.router'));
router.use('/products', require('./products/products.router'));

router.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
})

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
})

module.exports = router;

