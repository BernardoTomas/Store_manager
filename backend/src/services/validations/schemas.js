const Joi = require('joi');

const productNameSchema = Joi.string().min(5);

const productSchema = Joi.object({
  name: productNameSchema,
});

module.exports = {
  productSchema,
};