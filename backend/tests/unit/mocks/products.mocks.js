const { SUCCESSFUL, NOT_FOUND } = require('../utils/statusStringsHTTP');

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

const dataNotFoundObj = { message: 'Product not found' };

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

module.exports = {
  allProductsMock,
  singleProductMock,
  dataNotFoundObj,
  allProductsServiceResMock,
  productByIdServiceResMock,
  productNotFoundServiceResMock,
};