const { productsModel } = require('../models');
const schema = require('./validations/validateEntries');

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

const registerNewProduct = async (newProduct) => {
  const error = schema.validateProductName(newProduct);
  if (error) return { status: error.status, data: error.data };

  const newProductRegistry = await productsModel.registerNewProduct(newProduct);
  return { status: 'CREATED', data: newProductRegistry };
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
};