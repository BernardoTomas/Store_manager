const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return { status: 'SUCCESSFUL', data: allProducts };
}

module.exports = {
  getAllProducts,
}