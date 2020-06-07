const menuList = require('../db/menu-list');
const Menu = require('../db/menuCreator');

exports.getMenuList = async function(req, res) {
  res.status(200).json(menuList);
}

exports.addMenu = async function(req, res) {
  menuList.push(new Menu(req.body));
  res.status(201).send();
}

exports.updateMenu = async function(req, res) {
  const targetMenu = menuList.find(menu => String(menu.id) === req.params.id);
  Object.assign(targetMenu, req.body);
  res.status(204).send();
}

exports.deleteMenu = async function(req, res) {
  const menuIndex = menuList.findIndex(menu => String(menu.id) === req.params.id);

  if(menuIndex !== -1) {
    menuList.splice(menuIndex, 1);
    res.status(204).send();
  } else {
    res.status(400).send({message: 'Menu was not found'});
  }
}
