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
  regNewProductServiceResMock,
  newProductMock,
  regNoNameProductServiceResMock,
  noNameObj,
  regBadNameProductServiceResMock,
  badNameObj,
  updateProductServiceResMock,
  updatedProductMock,
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

  it('Verificando o retorno do productsController.registerNewProduct com um produto válido - status 201', async function () {
    sinon.stub(productsService, 'registerNewProduct').resolves(regNewProductServiceResMock);

    const req = { body: { name: 'Guarda chuva RGB' } };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  it('Verificando o retorno do productsController.registerNewProduct com um produto sem nome - status 400', async function () {
    sinon.stub(productsService, 'registerNewProduct').resolves(regNoNameProductServiceResMock);

    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(noNameObj);
  });

  it('Verificando o retorno do productsController.registerNewProduct de um produto com nome inválido - status 422', async function () {
    sinon.stub(productsService, 'registerNewProduct').resolves(regBadNameProductServiceResMock);

    const req = { body: { name: 'RGB' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.registerNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(badNameObj);
  });

  it('Verificando o retorno do productsController.updateProduct de um produto existente com nome válido - status 200', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(updateProductServiceResMock);

    const req = { body: { name: 'Guarda chuva RGB' }, params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProductMock);
  });

  it('Verificando o retorno do productsController.updateProduct de um produto existente com nome inválido - status 422', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(regBadNameProductServiceResMock);

    const req = { body: { name: 'RGB' }, params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(badNameObj);
  });

  it('Verificando o retorno do productsController.updateProduct de um produto existente sem nome - status 400', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(regNoNameProductServiceResMock);

    const req = { body: {}, params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(noNameObj);
  });

  it('Verificando o retorno do productsController.updateProduct de um produto inexistente - status 400', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(productNotFoundServiceResMock);

    const req = { body: { name: 'Guarda chuva RGB' }, params: { id: 1000 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(dataNotFoundObj);
  });
});