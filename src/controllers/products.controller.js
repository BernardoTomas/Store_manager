const productsService = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  const {status, data} = await productsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
}

module.exports = {
  getAllProducts,
}