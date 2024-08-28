const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (_req, res) => {
  const { status, data } = await salesService.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSalesById(id);
  return res.status(mapStatusHTTP(status)).json(data);  
};

const registerNewSaleProducts = async (req, res) => {
  const newSaleProductsArr = req.body;
  const { status, data } = await salesService.registerNewSaleProducts(newSaleProductsArr);
  return res.status(mapStatusHTTP(status)).json(data);  
};

module.exports = {
  getAllSales,
  getSalesById,
  registerNewSaleProducts,
};