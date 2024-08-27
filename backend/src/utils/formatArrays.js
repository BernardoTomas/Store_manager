const camelize = require('camelize');
const snakeize = require('snakeize');

const camelizeArray = (arr) => arr.map((key) => camelize(key));

const snakeizeArray = (arr) => arr.map((key) => snakeize(key));

module.exports = {
  camelizeArray,
  snakeizeArray,
};