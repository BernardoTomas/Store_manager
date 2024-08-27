const { salesModel } = require('../models');

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

module.exports = {
  getAllSales,
  getSalesById,
};