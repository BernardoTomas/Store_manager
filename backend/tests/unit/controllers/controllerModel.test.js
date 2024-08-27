const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { 
  allProductsServiceResMock,
  allProductsMock,
  productByIdServiceResMock,
  singleProductMock,
  productNotFoundServiceResMock,
  dataNotFoundObj,
} = require('../mocks/products.mocks');

describe('Testes do products.controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando o retorno do productsController.getAllProducts - status 200', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(allProductsServiceResMock);

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock);
  });

  it('Verificando o retorno do productsController.getProductById com um id válido - status 200', async function () {
    sinon.stub(productsService, 'getProductById').resolves(productByIdServiceResMock);

    const req = { params: { id: 1 } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(singleProductMock);
  });

  it('Verificando o retorno do productsController.getProductById com um id inválido - status 404', async function () {
    sinon.stub(productsService, 'getProductById').resolves(productNotFoundServiceResMock);

    const req = { params: { id: 1000 } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(dataNotFoundObj);
  });
});