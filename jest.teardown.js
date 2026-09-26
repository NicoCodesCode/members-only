const pool = require("./db/pool");

module.exports = async () => {
  await pool.end();
};
