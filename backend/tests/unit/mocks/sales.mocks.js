const { snakeizeArray } = require('../../../src/utils/formatArrays');
const { NOT_FOUND, SUCCESSFUL } = require('../utils/statusStringsHTTP');

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

const saleNotFoundObj = { message: 'Sale not found' };

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

module.exports = {
  allSalesMock,
  allSalesMockDB,
  salesByIdMock,
  salesByIdMockDB,
  saleNotFoundObj,
  salesNotFoundServiceResMock,
  allSalesServiceResMock,
  salesByIdServiceResMock,
};