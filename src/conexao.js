const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  //password: '04022007',
  password: '123456',
  database: 'dindin',
});

module.exports = pool;
