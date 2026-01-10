const postProductsValidator = (req, res, next) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ message: 'Name must be more than 3' });
    }
    next();
}

const putProductsValidator = (req, res, next) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ message: 'Name must be more than 3' });
    }
    next();
}

module.exports = {
    postProductsValidator,
    putProductsValidator
}