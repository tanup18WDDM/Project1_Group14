const db = require('./db');


async function getAllProducts() {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
}

async function addProduct({ name, image, description, price }) {
  const [result] = await db.query(
    'INSERT INTO products (name, image, description, price) VALUES (?, ?, ?, ?)',
    [name, image, description, price]
  );
  return result.insertId;
}

module.exports = {
  getAllProducts,
  addProduct,
};
