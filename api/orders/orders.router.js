const express = require('express');
const router = express.Router();
const ordersCtrl = require('./orders.ctrl')

router.get('/', ordersCtrl.getOrdersHandler)
router.get('/render', ordersCtrl.renderOrders)
router.get('/render/:id', ordersCtrl.renderOrdersById)
router.get('/data/:userId', ordersCtrl.getOrdersData)
router.get('/:id', ordersCtrl.getOrdersByIdHandler)
router.post('/', ordersCtrl.postOrdersHandler)
router.post('/many', ordersCtrl.createOrdersHandler)
router.put('/many', ordersCtrl.updateOrdersHandler)
router.put('/:id', ordersCtrl.putOrdersByIdHandler)
router.delete('/many', ordersCtrl.deleteOrdersHandler)
router.delete('/:id', ordersCtrl.deleteOrderByIdHandler)

module.exports = router