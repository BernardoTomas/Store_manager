const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { 
  allSalesMock,
  salesByIdMock,
  saleNotFoundObj,
  newSalesProductModelMock,
  findProductsByIdModelMock1,
  findProductsByIdModelMock2,
  newSalesProductMock,
  newSalesProductModelNoQtMock,
  newSalesProductModelNoPIdMock,
  newSalesProductModelBadQtMock,
  newSalesProductModelNotFoundMock,
} = require('../mocks/sales.mocks');
const { SUCCESSFUL, NOT_FOUND, CREATED, BAD_REQUEST, INVALID_VALUE } = require('../utils/statusStringsHTTP');

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

  it('Verificando o retorno do salesService.registerNewSaleProducts com um array de produtos válido', async function () {
    sinon.stub(salesModel, 'registerNewSaleProducts').resolves(newSalesProductModelMock);
    sinon.stub(productsModel, 'getProductById')
      .onFirstCall()
      .resolves(findProductsByIdModelMock1)
      .onSecondCall()
      .resolves(findProductsByIdModelMock2);

    const registerNewSales = await salesService.registerNewSaleProducts(newSalesProductMock);

    expect(registerNewSales).to.be.an('object');
    expect(registerNewSales.status).to.equal(CREATED);
    expect(registerNewSales.data).to.deep.equal(newSalesProductModelMock);
  });

  it('Verificando o retorno do salesService.registerNewSaleProducts com um array de produtos com um produto sem a chave quantity', async function () {
    const noQtdError = { message: '"quantity" is required' };
    const registerNewSales = await salesService.registerNewSaleProducts(newSalesProductModelNoQtMock);

    expect(registerNewSales).to.be.an('object');
    expect(registerNewSales.status).to.equal(BAD_REQUEST);
    expect(registerNewSales.data).to.deep.equal(noQtdError);
  });

  it('Verificando o retorno do salesService.registerNewSaleProducts com um array de produtos com um produto sem a chave productId', async function () {
    const noPIdError = { message: '"productId" is required' };
    const registerNewSales = await salesService.registerNewSaleProducts(newSalesProductModelNoPIdMock);

    expect(registerNewSales).to.be.an('object');
    expect(registerNewSales.status).to.equal(BAD_REQUEST);
    expect(registerNewSales.data).to.deep.equal(noPIdError);
  });

  it('Verificando o retorno do salesService.registerNewSaleProducts com um array de produtos com um produto com quantidade menor ou igual a zero', async function () {
    const badQtdError = { message: '"quantity" must be greater than or equal to 1' };
    const registerNewSales = await salesService.registerNewSaleProducts(newSalesProductModelBadQtMock);

    expect(registerNewSales).to.be.an('object');
    expect(registerNewSales.status).to.equal(INVALID_VALUE);
    expect(registerNewSales.data).to.deep.equal(badQtdError);
  });

  it('Verificando o retorno do salesService.registerNewSaleProducts com um array de produtos com um produto inexistente', async function () {
    sinon.stub(productsModel, 'getProductById')
      .onFirstCall()
      .resolves(undefined)
      .onSecondCall()
      .resolves({
        id: 2,
        name: 'Traje de encolhimento',
      });
    
    const productNotFoundError = { message: 'Product not found' };
    const registerNewSales = await salesService.registerNewSaleProducts(newSalesProductModelNotFoundMock);

    expect(registerNewSales).to.be.an('object');
    expect(registerNewSales.status).to.equal(NOT_FOUND);
    expect(registerNewSales.data).to.deep.equal(productNotFoundError);
  });
});