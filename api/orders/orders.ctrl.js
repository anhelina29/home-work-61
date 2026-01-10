const OrderModel = require('../../models/orders');

const getOrdersHandler = async (req, res) => {
    const orders = await OrderModel.find()
    res.status(200).json({data: orders})
}

const getOrdersByIdHandler = async (req, res) => {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId)
    
    if (!order) {
        return res.status(404).json({data: `Order with id ${orderId} not found`});
    }
    
    res.status(200).json({data: order})
}

const postOrdersHandler = async (req, res) => {
    const {userId, products, totalPrice, status, scheduleDate } = req.body
    const newOrder = await OrderModel.create({
        userId: userId,
        products: products,
        totalPrice: totalPrice,
        status: status,
        scheduleDate: scheduleDate
    })
    res.status(201).json({data: newOrder})
}

const putOrdersByIdHandler = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body
    const order = await OrderModel.findById(orderId)
    
    if (!order) {
        return res.status(404).json({data: `Order with id ${orderId} not found`});
    }
    
    order.status = status
    
    res.status(200).json({data: order})
}

const deleteOrderByIdHandler = async (req, res) => {
    orderId = req.params.id;

    const order = await OrderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ data: `Order with id ${ordertId} not found`})
    }

    await OrderModel.deleteOne({ _id: orderId })

    return res.status(200).json({ data: `Order with id ${orderId} deleted`})
}

const renderOrders = async (req, res) => {
    const orders = await OrderModel.find()
    .populate('userId')
    .populate('products')
    const data = {
        title: 'Orders',
        orders: orders,
        order: null
    }
    res.render('orders.ejs', data);
}

const renderOrdersById = async (req, res) => {
    const orderId = req.params.id
    const order = await OrderModel.findById(orderId)
    .populate('userId')
    .populate('products')
    const data = {
        title: 'Orders',
        order: order,
        orders: null
    }
    res.render('orders.ejs', data);
}

module.exports = {
    getOrdersHandler,
    getOrdersByIdHandler,
    postOrdersHandler,
    putOrdersByIdHandler,
    deleteOrderByIdHandler,
    renderOrders,
    renderOrdersById
}
