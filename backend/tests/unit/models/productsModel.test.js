const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProductsMock, singleProductMock, newProductMock } = require('../mocks/products.mocks');

describe('Testes do products.model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando o retorno do productsModel.getAllProducts', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const allProducts = await productsModel.getAllProducts();

    expect(allProducts).to.be.an('array');
    expect(allProducts).to.deep.equal(allProductsMock);
  });

  it('Verificando o funcionamento do productsModel.getProductById pesquisando um id válido', async function () {
    sinon.stub(connection, 'execute').resolves([[singleProductMock]]);
    const productId = 1;

    const productById = await productsModel.getProductById(productId);

    expect(productById).to.be.an('object');
    expect(productById).to.deep.equal(singleProductMock);
  });

  it('Verificando o funcionamento do productsModel.getProductById pesquisando um id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([[{}]]);
    const productId = 1000;

    const productById = await productsModel.getProductById(productId);

    expect(productById).to.be.an('object');
    expect(productById).to.deep.equal({});
  });

  it('Verificando o funcionamento do productsModel.registerNewProduct registrando um produto válido', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()  
      .resolves(null)
      .onSecondCall()
      .resolves([[newProductMock]]);

    const newProduct = {
      name: 'Guarda chuva RGB',
    };

    const newProductRegistry = await productsModel.registerNewProduct(newProduct);

    expect(newProductRegistry).to.be.an('object');
    expect(newProductRegistry).to.deep.equal(newProductMock);
  });
});