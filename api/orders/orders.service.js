const OrderModel = require('../../models/orders')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const getOrdersList = async ({ page, limit }) => {
    const orders = await OrderModel.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
    return orders
}

const getOrdersData = async (userId) => {
    const ordersData = await OrderModel.aggregate()
        .match({
            userId: new ObjectId(userId),
            createdAt: {
                $gte: new Date('2026-01-01'),
                $lte: new Date('2026-02-01')
            }
        })
        .group({
            _id: '$userId',
            ordersId: {
                $push: '$_id'
            },
            totalOrdersSum: {
                $sum: '$totalPrice'
            }
        })
        .project({
            _id: 0,
            userId: '$_id',
            ordersId: 1,
            totalOrdersSum: 1
        })
        .lookup({
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        })
        .unwind('$user')

    return ordersData
}

const getOrderById = async (orderId) => {
    const order = await OrderModel.findById(orderId)
    return order
}

const postOrder = async (orderData) => {
    const newOrder = await OrderModel.create(orderData)
    return newOrder
}

const createOrders = async (ordersData) => {
    const newOrders = await OrderModel.insertMany(ordersData)
    return newOrders
}

const putOrderById = async (orderId, orderData) => {
    const order = await OrderModel.findByIdAndUpdate(orderId, { $set: orderData }, { new: true })

    return order
}

const updateOrders = async (filter, update) => {
    const orders = await OrderModel.updateMany(filter, update)
    return orders
}

const deleteOrderById = (orderId) => {
    return OrderModel.findByIdAndDelete(orderId)
}

const deleteOrders = async (filter) => {
    const orders = await OrderModel.deleteMany(filter)
    return orders
}

module.exports = {
    getOrdersList,
    getOrdersData,
    getOrderById,
    createOrders,
    putOrderById,
    updateOrders,
    deleteOrderById,
    deleteOrders,
    postOrder
}
