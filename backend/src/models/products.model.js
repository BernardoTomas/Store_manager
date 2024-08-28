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

const registerNewProduct = async (newProduct) => {
  await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [newProduct.name],
  );
  const [[newProductEntry]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?;',
    [newProduct.name],
  );
  return camelize(newProductEntry);
};

const updateProduct = async (productId, newNameObj) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [newNameObj.name, productId],
  );
};

const deleteProduct = async (productId) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  updateProduct,
  deleteProduct,
};