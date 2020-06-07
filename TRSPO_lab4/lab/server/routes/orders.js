const express = require('express');
const router  = express.Router();
const orderController = require('../controllers/orderController');

router.get('/admin', orderController.getOrderList);
router.get('/admin/check/:id', orderController.getOrderCheck);

router.post('/neworder', orderController.addOrder);

router.put('/admin/:id', orderController.updateOrder);
router.put('/client/:id', orderController.updateOrder);

router.delete('/admin/:id', orderController.deleteOrder);

module.exports = router;