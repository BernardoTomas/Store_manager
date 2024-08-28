const schemas = require('./schemas');

const requiredFields = ['productId', 'quantity'];

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

const requiredFieldsExistInArr = (salesProductArr, reqField) => {
  if (!salesProductArr.every((product) => product[reqField] !== undefined)) {
    return { 
      status: 'BAD_REQUEST',
      data: { 
        message: `"${reqField}" is required`, 
      }, 
    };
  } 
};

const validateSalesProductArr = (salesProductArr) => {
  const errorArr = requiredFields.map((field) => requiredFieldsExistInArr(salesProductArr, field));
  if (!errorArr.every((error) => error === undefined)) {
    return errorArr.find((error) => error !== undefined);
  } if (salesProductArr.some(({ quantity }) => quantity <= 0)) {
    return { 
      status: 'INVALID_VALUE',
      data: { 
        message: '"quantity" must be greater than or equal to 1', 
      }, 
    };
  }
};

module.exports = {
  validateProductName,
  validateSalesProductArr,
};