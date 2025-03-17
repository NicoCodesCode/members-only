const { Pool } = require("pg");

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;

module.exports = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  database: PGDATABASE,
  port: PGPORT,
});
