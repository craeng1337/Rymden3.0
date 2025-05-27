const db = require('./database');

async function updateUser({ id, name, nickname, age, bio }) {
  const sql = 'UPDATE users SET name = ?, nickname = ?, age = ?, bio = ? WHERE id = ?';
  const values = [name, nickname, age, bio, id];
  await db.query(sql, values);
}


async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}

async function createUser({ name, nickname, age, bio }) {
  const sql = 'INSERT INTO users (name, nickname, age, bio) VALUES (?, ?, ?, ?)';
  const values = [name, nickname, age, bio];
  await db.query(sql, values);
}

async function getUserById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]; // enskild användare
}

async function deleteUser(id) {
  await db.query('DELETE FROM users WHERE id = ?', [id]);
}




module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};