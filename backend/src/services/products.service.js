const { productsModel } = require('../models');
const schema = require('./validations/validateEntries');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return { status: 'SUCCESSFUL', data: allProducts };
};

const getProductById = async (productId) => {
  const productById = await productsModel.getProductById(productId);
  if (!productById) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: productById };
};

const registerNewProduct = async (newProduct) => {
  // Refactor this to middleware
  const error = schema.validateProductName(newProduct);
  if (error) return { status: error.status, data: error.data };
  // ----------------
  const newProductRegistry = await productsModel.registerNewProduct(newProduct);
  return { status: 'CREATED', data: newProductRegistry };
};

const updateProduct = async (productId, newNameObj) => {
  // Refactor this to middleware
  const error = schema.validateProductName(newNameObj);
  if (error) return { status: error.status, data: error.data };
  // ----------------
  
  const productExists = await productsModel.getProductById(productId);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await productsModel.updateProduct(productId, newNameObj);

  const changedProduct = await productsModel.getProductById(productId);
  return { status: 'SUCCESSFUL', data: changedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
};