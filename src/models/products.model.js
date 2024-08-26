const camelize = require('camelize');
const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products'
  );
  const camelizedProducts = products.map(product => camelize(product));
  return camelizedProducts;
}

module.exports = {
  getAllProducts,
}