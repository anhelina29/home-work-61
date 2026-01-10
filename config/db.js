const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_URL)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('Connection error: ', err)
    }
}

module.exports = connectDB