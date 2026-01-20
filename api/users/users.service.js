const UserModel = require('../../models/users')
const bcrypt = require('bcryptjs')

const getUserList = async (userData) => {
    const users = await UserModel.find(userData)
    return users
}

const getUserById = async (userId) => {
    const user = await UserModel.findById(userId)
    return user
}

const putUserById = async (userId, userData) => {
    const user = await UserModel.findByIdAndUpdate(userId, { $set: userData }, { new: true })
    return user
}

const deleteUserById = (userId) => {
    return UserModel.findByIdAndDelete(userId)
}

const signUp = async (userData) => {
    const isExistingUser = await UserModel.findOne({ email: userData.email })

    if (isExistingUser) {
        return null
    }

    const hash = await bcrypt.hash(userData.password, 10)

    const newUser = await UserModel.create({
        ...userData,
        password: hash
    })

    return newUser
}

module.exports = {
    getUserList,
    getUserById,
    putUserById,
    deleteUserById,
    signUp
}