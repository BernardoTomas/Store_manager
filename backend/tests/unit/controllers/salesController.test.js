const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { 
  allSalesServiceResMock,
  allSalesMock,
  salesByIdServiceResMock,
  salesByIdMock,
  salesNotFoundServiceResMock,
  saleNotFoundObj,
} = require('../mocks/sales.mocks');

describe('Testes do sales.controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando o retorno do salesController.getAllSales - status 200', async function () {
    sinon.stub(salesService, 'getAllSales').resolves(allSalesServiceResMock);

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesMock);
  });

  it('Verificando o retorno do salesController.getSalesById com um id válido - status 200', async function () {
    sinon.stub(salesService, 'getSalesById').resolves(salesByIdServiceResMock);

    const req = { params: { id: 1 } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesByIdMock);
  });

  it('Verificando o retorno do salesController.getSalesById com um id inválido - status 404', async function () {
    sinon.stub(salesService, 'getSalesById').resolves(salesNotFoundServiceResMock);

    const req = { params: { id: 1000 } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(saleNotFoundObj);
  });
});