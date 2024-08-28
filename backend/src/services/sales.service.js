const { salesModel, productsModel } = require('../models');
const validateEntries = require('./validations/validateEntries');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return { status: 'SUCCESSFUL', data: allSales };
};

const getSalesById = async (saleId) => {
  const salesById = await salesModel.getSalesById(saleId);
  if (!salesById || salesById.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: salesById };
};

const registerNewSaleProducts = async (saleProductsArr) => {
  // Refactor this to middleware
  const error = validateEntries.validateSalesProductArr(saleProductsArr);
  if (error) return { status: error.status, data: error.data };
  // ----------------
  const productsArr = await Promise.all(saleProductsArr.map(({ productId }) => {
    const productById = productsModel.getProductById(productId);
    return productById; 
  }));

  if (productsArr.some((product) => product === undefined)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const newSaleProductsArr = await salesModel.registerNewSaleProducts(saleProductsArr);
  return { status: 'CREATED', data: newSaleProductsArr };
};

module.exports = {
  getAllSales,
  getSalesById,
  registerNewSaleProducts,
};