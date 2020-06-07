const express = require('express');
const router  = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getMenuList);

router.post('/admin', menuController.addMenu);

router.put('/admin/:id', menuController.updateMenu);

router.delete('/admin/:id', menuController.deleteMenu);

module.exports = router;