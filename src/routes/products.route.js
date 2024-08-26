const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getAllProducts);

module.exports = route;