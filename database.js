const mysql = require('mysql2');

// Ersus anslutningspool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', 
  database: 'ersus_db'
});

// Exportera promise-baserad pool
module.exports = pool.promise();
