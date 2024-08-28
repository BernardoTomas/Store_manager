const { 
  SUCCESSFUL, 
  NOT_FOUND, 
  CREATED, 
  BAD_REQUEST,
  INVALID_VALUE,
} = require('../utils/statusStringsHTTP');

const allProductsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const singleProductMock = {
  id: 1,
  name: 'Martelo de Thor',
};

const newProductMock = {
  id: 4,
  name: 'Guarda chuva RGB',
};

const updatedProductMock = {
  id: 1,
  name: 'Guarda chuva RGB',
};

const dataNotFoundObj = { message: 'Product not found' };

const noNameObj = { message: '"name" is required' };

const badNameObj = { message: '"name" length must be at least 5 characters long' };

const productNotFoundServiceResMock = {
  status: NOT_FOUND,
  data: dataNotFoundObj,
};

const allProductsServiceResMock = {
  status: SUCCESSFUL,
  data: allProductsMock,
};

const productByIdServiceResMock = {
  status: SUCCESSFUL,
  data: singleProductMock,
};

const regNewProductServiceResMock = {
  status: CREATED,
  data: newProductMock,
};

const regNoNameProductServiceResMock = {
  status: BAD_REQUEST,
  data: noNameObj,
};

const regBadNameProductServiceResMock = {
  status: INVALID_VALUE,
  data: badNameObj,
};

const updateProductServiceResMock = {
  status: SUCCESSFUL,
  data: updatedProductMock,
};

module.exports = {
  allProductsMock,
  singleProductMock,
  newProductMock,
  dataNotFoundObj,
  noNameObj,
  badNameObj,
  allProductsServiceResMock,
  productByIdServiceResMock,
  productNotFoundServiceResMock,
  regNewProductServiceResMock,
  regNoNameProductServiceResMock,
  regBadNameProductServiceResMock,
  updatedProductMock,
  updateProductServiceResMock,
};