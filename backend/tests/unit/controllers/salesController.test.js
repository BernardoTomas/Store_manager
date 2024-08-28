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
  regNewSaleProdServiceResMock,
  newSalesProductMock,
  newSalesProductModelMock,
  regNewSaleProdServiceResNoPIdMock,
  regNewSaleProdServiceResNoQtdMock,
  regNewSaleProdServiceResBadQtdMock,
  regNewSaleProdServiceResProdNotFoundMock,
  productNotFoundError,
  badQtdError,
  noQtdError,
  noPIdError,
  newSalesProductModelNoPIdMock,
  newSalesProductModelNoQtMock,
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

  it('Verificando o retorno do salesController.registerNewSaleProducts com um array de produtos válido - status 201', async function () {
    sinon.stub(salesService, 'registerNewSaleProducts').resolves(regNewSaleProdServiceResMock);

    const req = newSalesProductMock;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.registerNewSaleProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSalesProductModelMock);
  });

  it('Verificando o retorno do salesController.registerNewSaleProducts de um array com um objeto sem productId - status 400', async function () {
    sinon.stub(salesService, 'registerNewSaleProducts').resolves(regNewSaleProdServiceResNoPIdMock);

    const req = newSalesProductModelNoPIdMock;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.registerNewSaleProducts(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(noPIdError);
  });

  it('Verificando o retorno do salesController.registerNewSaleProducts de um array com um objeto sem quantity - status 400', async function () {
    sinon.stub(salesService, 'registerNewSaleProducts').resolves(regNewSaleProdServiceResNoQtdMock);

    const req = newSalesProductModelNoQtMock;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.registerNewSaleProducts(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(noQtdError);
  });

  it('Verificando o retorno do salesController.registerNewSaleProducts de um array com um objeto com quantity inválido - status 422', async function () {
    sinon.stub(salesService, 'registerNewSaleProducts').resolves(regNewSaleProdServiceResBadQtdMock);

    const req = [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.registerNewSaleProducts(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(badQtdError);
  });

  it('Verificando o retorno do salesController.registerNewSaleProducts de um array com um objeto inexistente - status 404', async function () {
    sinon.stub(salesService, 'registerNewSaleProducts').resolves(regNewSaleProdServiceResProdNotFoundMock);

    const req = [
      {
        productId: 10000,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.registerNewSaleProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productNotFoundError);
  });
});