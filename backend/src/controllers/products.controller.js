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

const registerNewProduct = async (req, res) => {
  const newProduct = req.body;
  const { status, data } = await productsService.registerNewProduct(newProduct);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const newNameObj = req.body;

  const { status, data } = await productsService.updateProduct(productId, newNameObj);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
};