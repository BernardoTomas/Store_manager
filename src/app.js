const express = require('express');
const { productsRoutes } = require('./routes')
const app = express();

app.use(express.json());

app.use('/', productsRoutes);

module.exports = app;