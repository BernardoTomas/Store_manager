const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/products', productsController.getAllProducts);

module.exports = route;