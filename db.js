const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',      
  password: 'mysql123', 
  database: 'product_app',
});

module.exports = db;