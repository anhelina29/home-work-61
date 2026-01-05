const postProductsValidator = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ message: 'Title is required' });
    }
    next();
}

const putProductsValidator = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ message: 'Title is required' });
    }
    next();
}

module.exports = {
    postProductsValidator,
    putProductsValidator
}