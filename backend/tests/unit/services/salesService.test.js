const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { 
  allSalesMock,
  salesByIdMock,
  saleNotFoundObj,
} = require('../mocks/sales.mocks');
const { SUCCESSFUL, NOT_FOUND } = require('../utils/statusStringsHTTP');

describe('Testes do sales.service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando o retorno do salesService.getAllSales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSalesMock);

    const allSalesRes = await salesService.getAllSales();

    expect(allSalesRes).to.be.an('object');
    expect(allSalesRes.status).to.equal(SUCCESSFUL);
    expect(allSalesRes.data).to.deep.equal(allSalesMock);
  });

  it('Verificando o retorno do salesService.getSalesById com um id válido', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesByIdMock);

    const saleId = 1;

    const salesByIdRes = await salesService.getSalesById(saleId);

    expect(salesByIdRes).to.be.an('object');
    expect(salesByIdRes.status).to.equal(SUCCESSFUL);
    expect(salesByIdRes.data).to.deep.equal(salesByIdMock);
  });

  it('Verificando o retorno do salesService.getSalesById com um id inválido', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([]);

    const saleId = 1000;

    const salesByIdRes = await salesService.getSalesById(saleId);

    expect(salesByIdRes).to.be.an('object');
    expect(salesByIdRes.status).to.equal(NOT_FOUND);
    expect(salesByIdRes.data).to.deep.equal(saleNotFoundObj);
  });
});