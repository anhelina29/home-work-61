const express = require('express');
const router = express.Router();
const ordersCtrl = require('./orders.ctrl')

router.get('/', ordersCtrl.getOrdersHandler)
router.get('/render', ordersCtrl.renderOrders)
router.get('/render/:id', ordersCtrl.renderOrdersById)
router.get('/:id', ordersCtrl.getOrdersByIdHandler)
router.post('/', ordersCtrl.postOrdersHandler)
router.put('/:id', ordersCtrl.putOrdersByIdHandler)
router.delete('/:id', ordersCtrl.deleteOrderByIdHandler)

module.exports = router