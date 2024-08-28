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
  updatedProductMock,
  updateProductServiceResMock,
  badNameObj,
  noNameObj,
} = require('../mocks/products.mocks');
const { SUCCESSFUL, NOT_FOUND, INVALID_VALUE, BAD_REQUEST, NO_CONTENT } = require('../utils/statusStringsHTTP');

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
    sinon.stub(productsModel, 'getProductById').resolves(undefined);

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

  it('Verificando o retorno do productsService.updateProduct de um produto existente com nome válido', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(null);
    sinon.stub(productsModel, 'getProductById').resolves(updatedProductMock);
    const productId = 1;
    const newNameObj = {
      name: 'Guarda chuva RGB',
    };

    const updatedProductRes = await productsService.updateProduct(productId, newNameObj);

    expect(updatedProductRes).to.be.an('object');
    expect(updatedProductRes).to.deep.equal(updateProductServiceResMock);
  });

  it('Verificando o retorno do productsService.updateProduct de um produto existente com nome inválido', async function () {
    const productId = 1;
    const newNameObj = {
      name: 'RGB',
    };

    const updatedProductRes = await productsService.updateProduct(productId, newNameObj);

    expect(updatedProductRes).to.be.an('object');
    expect(updatedProductRes.status).to.equal(INVALID_VALUE);
    expect(updatedProductRes.data).to.deep.equal(badNameObj);
  });

  it('Verificando o retorno do productsService.updateProduct de um produto existente sem um nome', async function () {
    const productId = 1;
    const newNameObj = {};

    const updatedProductRes = await productsService.updateProduct(productId, newNameObj);

    expect(updatedProductRes).to.be.an('object');
    expect(updatedProductRes.status).to.equal(BAD_REQUEST);
    expect(updatedProductRes.data).to.deep.equal(noNameObj);
  });

  it('Verificando o retorno do productsService.updateProduct de um produto inexistente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    
    const productId = 10000;
    const newNameObj = {
      name: 'Guarda chuva RGB',
    };

    const updatedProductRes = await productsService.updateProduct(productId, newNameObj);

    expect(updatedProductRes).to.be.an('object');
    expect(updatedProductRes.status).to.equal(NOT_FOUND);
    expect(updatedProductRes.data).to.deep.equal(dataNotFoundObj);
  });

  it('Verificando o retorno do productsService.deleteProduct de um produto existente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(singleProductMock);
    sinon.stub(productsModel, 'deleteProduct').resolves(null);

    const productId = 1;
    
    const deleteProductRes = await productsService.deleteProduct(productId);

    expect(deleteProductRes).to.be.an('object');
    expect(deleteProductRes.status).to.equal(NO_CONTENT);
  });

  it('Verificando o retorno do productsService.deleteProduct de um produto inexistente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    sinon.stub(productsModel, 'deleteProduct').resolves(null);

    const productId = 1000;
    
    const deleteProductRes = await productsService.deleteProduct(productId);

    expect(deleteProductRes).to.be.an('object');
    expect(deleteProductRes.status).to.equal(NOT_FOUND);
    expect(deleteProductRes.data).to.deep.equal(dataNotFoundObj);
  });
});