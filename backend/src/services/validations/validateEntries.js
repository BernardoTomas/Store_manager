const schemas = require('./schemas');

const validateProductName = (newProduct) => {
  if (!newProduct.name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }
  const { error } = schemas.productSchema.validate(newProduct);
  if (error) {
    return { 
      status: 'INVALID_VALUE',
      data: { 
        message: '"name" length must be at least 5 characters long', 
      }, 
    };
  }
};

module.exports = {
  validateProductName,
};