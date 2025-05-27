const mysql = require('mysql2');

// Skapa en anslutningspool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // eller ditt riktiga lösenord
  database: 'ersus_db'
});

// Exportera promise-baserad pool
module.exports = pool.promise();
