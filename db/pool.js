const { Pool } = require("pg");

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

module.exports = new Pool({
  connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
});
