const pool = require("./pool");

exports.getUserByUsername = async (username) => {
  query = "SELECT * FROM users WHERE username = $1";
  const { rows } = await pool.query(query, [username]);
  return rows[0];
};

exports.getUserById = async (id) => {
  query = "SELECT * FROM users WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

exports.insertUser = async (user) => {
  query =
    "INSERT INTO users (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, 'not member')";
  await pool.query(query, [
    user.firstName,
    user.lastName,
    user.username,
    user.password,
  ]);
};

exports.becomeMember = async (userId) => {
  query = "UPDATE users SET membership_status = 'member' WHERE id = $1";
  await pool.query(query, [userId]);
};

exports.createNewMessage = async (message, date, userId) => {
  query =
    "INSERT INTO messages (title, text, date, user_id) VALUES ($1, $2, $3, $4)";
  await pool.query(query, [message.title, message.text, date, userId]);
};

exports.getAllMessages = async () => {
  query =
    "SELECT messages.title, messages.text, messages.date, users.username FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY messages.date DESC";
  const { rows } = await pool.query(query);
  return rows;
};
