const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('./logic');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.post('/create', async (req, res) => {
  const { name, nickname, age, bio, email, phone } = req.body;
  await createUser({ name, nickname, age, bio, email, phone });
  res.redirect('/');
});


app.post('/edit', async (req, res) => {
  const { id, name, nickname, age, bio, email, phone } = req.body;

  if (parseInt(age) > 150) {
    const user = await getUserById(id);
    return res.render('edit', {
      user,
      error: "Ingen är så gammal 😅 – försök med en ålder under 150."
    });
  }

  await updateUser({ id, name, nickname, age, bio, email, phone });
  res.redirect('/');
});


app.post('/delete', async (req, res) => {
  const { id } = req.body;
  await deleteUser(id);
  res.redirect('/');
});



app.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.render('index', { users });
});


app.get('/user', async (req, res) => {
  const id = req.query.id;
  const user = await getUserById(id);
  res.render('user', { user });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.get('/edit', async (req, res) => {
  const id = req.query.id;
  const user = await getUserById(id);
  res.render('edit', { user });
});

module.exports = app;
