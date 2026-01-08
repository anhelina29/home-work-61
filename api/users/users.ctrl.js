const { randomUUID } = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
    { id: 2, name: 'Steve Jobs', email: 'steve.jobs@example.com', password: 'password123' },
    { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', password: 'password123' },
    { id: 4, name: 'Noah Doe', email: 'noah.doe@example.com', password: 'password123' },
    { id: 5, name: 'Jack Doe', email: 'jack.doe@example.com', password: 'password123' },
]

const getUsersHandler = (req, res) => {
    res.status(200).json({ data: users });
}

const getUsersByIdHandler = (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id.toString() === id.toString());
    res.status(200).json({ data: user });
}

const putUsersByIdHandler = (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;
    const user = users.find(user => user.id.toString() === userId.toString());

    if (!user) {
        return res.status(404).json({ data: `User with id ${userId} not found` });
    }

    user.name = name
    res.status(200).json({ data: user });
}

const deleteUsersByIdHandler = (req, res) => {
    const userId = req.params.id
    const user = users.find(user => user.id.toString() === userId.toString());

    if (!user) {
        return res.status(404).json({ data: `User with id ${userId} not found` });
    }

    users = users.filter(user => user.id.toString() !== userId.toString());
    return res.status(200).json({ data: `Delete user by id - ${userId}` });
}

const renderUsers = (req, res) => {
    const data = {
        title: 'Users',
        users: users
    }
    res.render('users.pug', data);
}

const renderUsersById = (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id.toString() === userId.toString());
    const data = {
        title: 'Users',
        user: user
    }
    res.render('users.pug', data);
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const user = users.find(user => user.email.toString() === email.toString());

    if (user) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = {
        id: randomUUID(),
        name: name,
        email: email,
        password: hash,
    }

    users.push(newUser)
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
    getUsersHandler,
    getUsersByIdHandler,
    putUsersByIdHandler,
    deleteUsersByIdHandler,
    renderUsers,
    renderUsersById,
    signUp,
    login,
    logout,
    users
}
