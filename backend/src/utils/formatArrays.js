const camelize = require('camelize');
const snakeize = require('snakeize');

const camelizeArray = (arr) => arr.map((key) => camelize(key));

const snakeizeArray = (arr) => arr.map((key) => snakeize(key));

const formattedProductSalesArr = (salesByIdArr) => {
  const newArr = salesByIdArr
    .map((product) => {
      const { date, ...newProduct } = product;
      return newProduct;
    });
  return newArr;
};

module.exports = {
  camelizeArray,
  snakeizeArray,
  formattedProductSalesArr,
};