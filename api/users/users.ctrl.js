const UserService = require('./users.service')

const getUsersByIdHandler = async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);

    if (!user) {
        return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    res.status(200).json({ data: user });
}

const putUsersByIdHandler = async (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;
    const user = await UserService.putUserById(userId, { name: name });

    if (!user) {
        return res.status(404).json({ error: `User with id ${userId} not found` });
    }
    
    res.status(200).json({ data: user });
}

const deleteUsersByIdHandler = async (req, res) => {
    const userId = req.params.id
    const user = await UserService.deleteUserById(userId);

    if (!user) {
        return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    return res.status(200).json({ data: `Delete user by id - ${userId}` });
}

const renderUsers = async (req, res) => {
    const users = await UserService.getUserList()
    const data = {
        title: 'Users',
        users: users,
        user: null
    }
    res.render('users.pug', data);
}

const renderUsersById = async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    const data = {
        title: 'Users',
        user: user,
        users: null
    }
    res.render('users.pug', data);
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const isExistingUser = await UserService.signUp({ email });

    if (isExistingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await UserService.signUp({
        name: name,
        email: email,
        password: hash,
    })
    return res.status(201).json(newUser)

}

const login = async (req, res) => {
    try {
        res.status(200).json({ data: 'Login successful!' })
    } catch (err) {
        res.status(400).json({ error: 'Login failed!' })
    }

}

const logout = (req, res) => {
    try {
        return req.logout((err) => {
            if (err) {
                return res.status(400).json({ error: 'Logout failed!' })
            }
            return res.status(200).json({ data: 'Logout successful' });
        })
    } catch (err) {
        return res.status(400).json({ error: 'Logout failed!' })
    }

}

module.exports = {
    getUsersByIdHandler,
    putUsersByIdHandler,
    deleteUsersByIdHandler,
    renderUsers,
    renderUsersById,
    signUp,
    login,
    logout
}
