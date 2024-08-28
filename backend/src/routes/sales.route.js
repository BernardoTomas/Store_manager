const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAllSales);

route.get('/:id', salesController.getSalesById);

route.post('/', salesController.registerNewSaleProducts);

module.exports = route;