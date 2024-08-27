const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProductById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
};