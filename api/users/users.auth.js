const usersAuth = (req, res, next) => {
    const {user} = req.body;
    if (!user) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    next()
}
module.exports = usersAuth