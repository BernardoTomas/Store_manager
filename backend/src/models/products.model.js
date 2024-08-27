const camelize = require('camelize');
const connection = require('./connection');
const formatArrays = require('../utils/formatArrays');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  const camelizedProducts = formatArrays.camelizeArray(products);
  return camelizedProducts;
};

const getProductById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};