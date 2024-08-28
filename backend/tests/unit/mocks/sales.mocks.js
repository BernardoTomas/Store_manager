const { snakeizeArray } = require('../../../src/utils/formatArrays');
const { 
  NOT_FOUND, 
  SUCCESSFUL, 
  CREATED, 
  BAD_REQUEST, 
  INVALID_VALUE, 
} = require('../utils/statusStringsHTTP');

const allSalesMock = [
  {
    saleId: 1,
    date: '2024-08-27T00:04:24.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-08-27T00:04:24.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-08-27T00:04:24.000Z',
    productId: 3,
    quantity: 15,
  },
];

const allSalesMockDB = snakeizeArray(allSalesMock);

const salesByIdMock = [
  {
    date: '2024-08-27T02:28:51.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2024-08-27T02:28:51.000Z',
    productId: 2,
    quantity: 10,
  },
];

const salesByIdMockDB = snakeizeArray(salesByIdMock);

const newSaleId = 4;

const newSalesProductMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const findProductsByIdModelMock1 = {
  id: 1,
  name: 'Martelo de Thor',
};

const findProductsByIdModelMock2 = {
  id: 2,
  name: 'Traje de encolhimento',
};

const newSalesProductModelMock = {
  id: newSaleId,
  itemsSold: newSalesProductMock,
};

const newSalesProductModelNoQtMock = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSalesProductModelBadQtMock = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSalesProductModelNotFoundMock = [
  {
    productId: 10000,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSalesProductModelNoPIdMock = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleNotFoundObj = { message: 'Sale not found' };
const productNotFoundError = { message: 'Product not found' };
const badQtdError = { message: '"quantity" must be greater than or equal to 1' };
const noQtdError = { message: '"quantity" is required' };
const noPIdError = { message: '"productId" is required' };

const salesNotFoundServiceResMock = {
  status: NOT_FOUND,
  data: saleNotFoundObj,
};

const allSalesServiceResMock = {
  status: SUCCESSFUL,
  data: allSalesMock,
};

const salesByIdServiceResMock = {
  status: SUCCESSFUL,
  data: salesByIdMock,
};

const regNewSaleProdServiceResMock = {
  status: CREATED,
  data: newSalesProductModelMock,
};

const regNewSaleProdServiceResNoPIdMock = {
  status: BAD_REQUEST,
  data: noPIdError,
};

const regNewSaleProdServiceResNoQtdMock = {
  status: BAD_REQUEST,
  data: noQtdError,
};

const regNewSaleProdServiceResBadQtdMock = {
  status: INVALID_VALUE,
  data: badQtdError,
};  

const regNewSaleProdServiceResProdNotFoundMock = {
  status: NOT_FOUND,
  data: productNotFoundError,
};

module.exports = {
  allSalesMock,
  allSalesMockDB,
  salesByIdMock,
  salesByIdMockDB,
  saleNotFoundObj,
  salesNotFoundServiceResMock,
  allSalesServiceResMock,
  salesByIdServiceResMock,
  newSalesProductMock,
  newSaleId,
  newSalesProductModelMock,
  newSalesProductModelNoQtMock,
  newSalesProductModelNoPIdMock,
  newSalesProductModelBadQtMock,
  newSalesProductModelNotFoundMock,
  findProductsByIdModelMock1,
  findProductsByIdModelMock2,
  regNewSaleProdServiceResMock,
  regNewSaleProdServiceResNoPIdMock,
  regNewSaleProdServiceResNoQtdMock,
  regNewSaleProdServiceResBadQtdMock,
  regNewSaleProdServiceResProdNotFoundMock,
  productNotFoundError,
  badQtdError,
  noQtdError,
  noPIdError,
};