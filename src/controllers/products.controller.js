const { productsService } = require('..services/');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async () => {
  const {status, data} = await productsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
}

module.exports = {
  getAllProducts,
}