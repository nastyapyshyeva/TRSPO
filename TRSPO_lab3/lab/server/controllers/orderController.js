const orderList = require('../db/order-list');
const Order = require('../db/orderCreator');
const menuList = require('../db/menu-list');

exports.getOrderList = async function(req, res) {
  res.status(200).json(orderList);
}

exports.getOrderCheck = async function(req, res) {
  let checkSum = 0;
  let orderCheck = {};
  const targetOrder = orderList.find(order => String(order.id) === req.params.id);
  let fullOrder = targetOrder.menuItem;
  fullOrder = fullOrder.split(',');
  fullOrder.forEach(ord => {
    menuList.forEach(item => {
      if(ord == item.id) {
        price = Number(item.price);
        checkSum = checkSum + price;
      }
    });    
  });
  orderCheck.check = checkSum;
  res.status(200).json(orderCheck);
}

exports.addOrder = async function(req, res) {
  orderList.push(new Order(req.body));
  res.status(201).send();
}

exports.updateOrder = async function(req, res) {
  const targetOrder = orderList.find(order => String(order.id) === req.params.id);
  Object.assign(targetOrder, req.body);
  res.status(204).send();
}

exports.deleteOrder = async function(req, res) {
  const orderIndex = orderList.findIndex(order => String(order.id) === req.params.id);

  if(orderIndex !== -1) {
    orderList.splice(orderIndex, 1);
    res.status(204).send();
  } else {
    res.status(400).send({message: 'Order was not found'});
  }
}
