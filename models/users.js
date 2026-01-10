const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength: 3,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'guest'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema, 'users')
