const { randomUUID } = require('crypto');

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Steve Jobs' },
    { id: 3, name: 'Jane Doe' },
    { id: 4, name: 'Noah Doe' },
    { id: 5, name: 'Jack Doe' },
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
    const userId = req.params.id;
    const { name } = req.body;
    const user = users.find(user => user.id.toString() === userId.toString());
    
    if (!user) {
        return res.status(404).json({data: `User with id ${userId} not found`});
    }

    users.name = name
    res.status(200).json({data: user});
}

const deleteUsersByIdHandler = (req, res) => {
    const userId = req.params.id
    const user = users.find(user => user.id.toString() === userId.toString());
    
    if (!user) {
        return res.status(404).json({data: `User with id ${userId} not found`});
    }

    users = users.filter(user => user.id.toString() !== userId.toString());
    return res.status(200).json({data: `Delete user by id - ${id}`});
}

module.exports = {
    users,
    getUsersHandler,
    postUsersHandler,
    getUsersByIdHandler,
    postUsersByIdHandler,
    putUsersByIdHandler,
    deleteUsersByIdHandler,
}
