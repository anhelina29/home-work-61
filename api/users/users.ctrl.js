const { randomUUID } = require('crypto');

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Steve' },
    { id: 3, name: 'Jan' },
    { id: 4, name: 'Feb' },
    { id: 5, name: 'Mar' },
]

const getUsersHandler = (req, res) => {
    res.status(200).json({data: users});
}

const postUsersHandler = (req, res) => {
    const { name } = req.body;
    const newUser = {
        id: randomUUID(),
        name: name,
    }

    users.push(newUser)

    res.status(201).json(newUser);
}

const getUsersByIdHandler = (req, res) => {
    const {id} = req.params;
    const user = users.find(user => user.id.toString() === id.toString());
    res.status(200).json({data: user});
}

const postUsersByIdHandler = (req, res) => {
    const {id} = req.params;
    res.status(200).json({data: `Post user by id - ${id}`});
}

const putUsersByIdHandler = (req, res) => {
    const {id} = req.params;
    const updatedUser = {
        id,
        ...req.body,
    }
    res.status(200).json({data: updatedUser});
}

const deleteUsersByIdHandler = (req, res) => {
    const {id} = req.params;
    res.status(200).json({data: `Delete user by id - ${id}`});
}

module.exports = {
    getUsersHandler,
    postUsersHandler,
    getUsersByIdHandler,
    postUsersByIdHandler,
    putUsersByIdHandler,
    deleteUsersByIdHandler,
}
