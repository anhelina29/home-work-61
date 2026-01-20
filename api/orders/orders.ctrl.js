const OrderService = require('./orders.service')

const getOrdersHandler = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 100

    const orders = await OrderService.getOrdersList({ page, limit })
    return res.status(200).json({ data: orders })
}

const getOrdersData = async (req, res) => {
    const userId = req.params.userId;
    const ordersData = await OrderService.getOrdersData(userId)

    return res.status(200).json({ data: ordersData })
}

const getOrdersByIdHandler = async (req, res) => {
    const order = await OrderService.getOrderById(req.params.id)

    if (!order) {
        return res.status(404).json({ data: `Order with id ${req.params.id} not found` });
    }

    return res.status(200).json({ data: order })
}

const postOrdersHandler = async (req, res) => {
    const { userId, products, totalPrice, status, scheduleDate } = req.body
    const newOrder = await OrderService.postOrder({
        userId: userId,
        products: products,
        totalPrice: totalPrice,
        status: status,
        scheduleDate: scheduleDate
    })
    return res.status(201).json({ data: newOrder })
}

const createOrdersHandler = async (req, res) => {
    const orders = await OrderService.createOrders(req.body)
    return res.status(201).json({ data: orders })
}

const putOrdersByIdHandler = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body
    const order = await OrderService.putOrderById(orderId, { status })

    if (!order) {
        return res.status(404).json({ data: `Order with id ${orderId} not found` });
    }

    return res.status(200).json({ data: order })
}

const updateOrdersHandler = async (req, res) => {
    const orders = await OrderService.updateOrders({ status: 'pending' }, { $set: { status: 'confirmed' } })
    return res.status(200).json({ data: 'Status of orders updated' })
}

const deleteOrderByIdHandler = async (req, res) => {
    const orderId = req.params.id;

    const order = await OrderService.deleteOrderById(orderId)

    if (!order) {
        return res.status(404).json({ data: `Order with id ${orderId} not found` })
    }

    return res.status(200).json({ data: `Order with id ${orderId} deleted` })
}

const deleteOrdersHandler = async (req, res) => {
    const orders = await OrderService.deleteOrders({ status: 'cancelled' })
    return res.status(200).json({ data: 'Orders with status "cancelled" deleted' })
}

const renderOrders = async (req, res) => {
    const orders = await OrderService.getOrdersList({ page: 1, limit: 100 })
    const data = {
        title: 'Orders',
        orders: orders,
        order: null
    }
    return res.render('orders.ejs', data);
}

const renderOrdersById = async (req, res) => {
    const orderId = req.params.id
    const order = await OrderService.getOrderById(orderId)
    const data = {
        title: 'Orders',
        order: order,
        orders: null
    }
    return res.render('orders.ejs', data);
}

module.exports = {
    getOrdersHandler,
    getOrdersByIdHandler,
    getOrdersData,
    postOrdersHandler,
    createOrdersHandler,
    putOrdersByIdHandler,
    updateOrdersHandler,
    deleteOrderByIdHandler,
    deleteOrdersHandler,
    renderOrders,
    renderOrdersById
}
