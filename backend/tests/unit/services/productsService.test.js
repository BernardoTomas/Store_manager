const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { 
  allProductsMock,
  singleProductMock,
  dataNotFoundObj,
  newProductMock,
  regNewProductServiceResMock,
  regNoNameProductServiceResMock,
  regBadNameProductServiceResMock,
} = require('../mocks/products.mocks');
const { SUCCESSFUL, NOT_FOUND } = require('../utils/statusStringsHTTP');

describe('Testes do products.service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando o retorno do productsService.getAllProducts', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(allProductsMock);

    const allProducts = await productsService.getAllProducts();

    expect(allProducts).to.be.an('object');
    expect(allProducts.status).to.equal(SUCCESSFUL);
    expect(allProducts.data).to.deep.equal(allProductsMock);
  });

  it('Verificando o retorno do productsService.getProductById com um id válido', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(singleProductMock);

    const productId = 1;

    const productById = await productsService.getProductById(productId);

    expect(productById.status).to.equal(SUCCESSFUL);
    expect(productById.data).to.deep.equal(singleProductMock);
  });

  it('Verificando o retorno do productsService.getProductById com um id inválido', async function () {
    sinon.stub(productsModel, 'getProductById').resolves({});

    const productId = 1000;

    const productById = await productsService.getProductById(productId);

    expect(productById.status).to.equal(NOT_FOUND);
    expect(productById.data).to.deep.equal(dataNotFoundObj);
  });

  it('Verificando o retorno do productsService.registerNewProduct com um produto válido', async function () {
    sinon.stub(productsModel, 'registerNewProduct').resolves(newProductMock);

    const newProduct = {
      name: 'Guarda chuva RGB',
    };
    const newProductRegistryRes = await productsService.registerNewProduct(newProduct);

    expect(newProductRegistryRes).to.be.an('object');
    expect(newProductRegistryRes).to.deep.equal(regNewProductServiceResMock);
  });

  it('Verificando o retorno do productsService.registerNewProduct com um produto sem nome', async function () {
    sinon.stub(productsModel, 'registerNewProduct').resolves(newProductMock);

    const newProduct = {};
    const newProductRegistryRes = await productsService.registerNewProduct(newProduct);

    expect(newProductRegistryRes).to.be.an('object');
    expect(newProductRegistryRes).to.deep.equal(regNoNameProductServiceResMock);
  });

  it('Verificando o retorno do productsService.registerNewProduct de um produto com nome inválido', async function () {
    sinon.stub(productsModel, 'registerNewProduct').resolves(newProductMock);

    const newProduct = {
      name: 'RGB',
    };
    const newProductRegistryRes = await productsService.registerNewProduct(newProduct);

    expect(newProductRegistryRes).to.be.an('object');
    expect(newProductRegistryRes).to.deep.equal(regBadNameProductServiceResMock);
  });
});