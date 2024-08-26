const { productsModel } = require('../models');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return { status: 'SUCCESSFUL', data: allProducts };
}

module.exports = {
  getAllProducts,
}