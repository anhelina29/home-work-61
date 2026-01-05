const productAccess = (req, res, next) => {
    const { role } = req.body;
    if (role !== 'admin') {
        return res.status(403).json({message: 'Forbidden'})
    }
    next()
}

module.exports = productAccess