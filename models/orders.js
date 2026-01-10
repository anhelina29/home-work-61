const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    scheduleDate: {
        type: Date
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema, 'orders')
