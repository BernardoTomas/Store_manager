const connection = require('./connection');
const formatArrays = require('../utils/formatArrays');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT salpro.sale_id, sales.date, salpro.product_id, salpro.quantity
    FROM
    sales_products AS salpro
    INNER JOIN sales ON salpro.sale_id = sales.id
    ORDER BY salpro.sale_id;`,
  );
  const camelizedSales = formatArrays.camelizeArray(sales);
  return camelizedSales;
};

const getSalesById = async (saleId) => {
  const [sales] = await connection.execute(
    `SELECT sales.date, salpro.product_id, salpro.quantity
      FROM
      sales_products AS salpro
      INNER JOIN sales ON salpro.sale_id = ?
      AND sales.id = salpro.sale_id
    ORDER BY salpro.sale_id, salpro.product_id;`,
    [saleId],
  );
  const camelizedSales = formatArrays.camelizeArray(sales);
  return camelizedSales;
};

const registerNewSaleProducts = async (saleProductsArr) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );
  await Promise.all(saleProductsArr.map(({ productId, quantity }) => connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?);`,
    [insertId, productId, quantity],
  )));
  return {
    id: insertId,
    itemsSold: saleProductsArr,
  };
};

module.exports = {
  getAllSales,
  getSalesById,
  registerNewSaleProducts,
};