const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesMock, allSalesMockDB, salesByIdMockDB, salesByIdMock } = require('../mocks/sales.mocks');

describe('Testes do sales.model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando o retorno do salesModel.getAllSales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMockDB]);

    const allSales = await salesModel.getAllSales();

    expect(allSales).to.be.an('array');
    expect(allSales).to.deep.equal(allSalesMock);
  });

  it('Verificando o funcionamento do salesModel.getSalesById pesquisando um id válido', async function () {
    sinon.stub(connection, 'execute').resolves([salesByIdMockDB]);
    const saleId = 1;

    const salesById = await salesModel.getSalesById(saleId);

    expect(salesById).to.be.an('array');
    expect(salesById).to.deep.equal(salesByIdMock);
  });

  it('Verificando o funcionamento do salesModel.getSalesById pesquisando um id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const saleId = 1000;

    const salesById = await salesModel.getSalesById(saleId);

    expect(salesById).to.be.an('array');
    expect(salesById).to.have.length(0);
  });
});