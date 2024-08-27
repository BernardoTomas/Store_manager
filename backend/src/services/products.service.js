const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return { status: 'SUCCESSFUL', data: allProducts };
};

const getProductById = async (productId) => {
  const productById = await productsModel.getProductById(productId);
  if (!productById || Object.keys(productById).length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: productById };
};

module.exports = {
  getAllProducts,
  getProductById,
};