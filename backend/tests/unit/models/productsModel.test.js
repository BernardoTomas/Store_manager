const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
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

  it('Verificando o funcionamento do productsModel.updateProduct atualizando um produto existente com um nome válido', async function () {
    const dbCall = sinon.stub(connection, 'execute').resolves(null);
    
    const testProdId = 1;

    const newNameObj = {
      name: 'Guarda chuva RGB',
    };

    await productsModel.updateProduct(testProdId, newNameObj);

    expect(dbCall).to.have.been.calledWith();
  });

  it('Verificando o funcionamento do productsModel.deleteProduct apagando um produto existente', async function () {
    const dbCall = sinon.stub(connection, 'execute').resolves(null);
    
    const testProdId = 1;

    await productsModel.deleteProduct(testProdId);

    expect(dbCall).to.have.been.calledWith();
  });
});