const db = require('./database');

async function updateUser({ id, name, nickname, age, bio, email, phone }) {
  const sql = 'UPDATE users SET name = ?, nickname = ?, age = ?, bio = ?, email = ?, phone = ? WHERE id = ?';
  const values = [name, nickname, age, bio, email, phone, id];
  await db.query(sql, values);
}



async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}

async function createUser({ name, nickname, age, bio, email, phone }) {
  const sql = 'INSERT INTO users (name, nickname, age, bio, email, phone) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, nickname, age, bio, email, phone];
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