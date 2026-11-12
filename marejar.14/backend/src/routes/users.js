const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();
const dbPath = path.join(__dirname, '../../data/db.json');

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

router.get('/me', auth, (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
  const { password, ...safe } = user;
  res.json({ user: safe });
});

router.put('/me', auth, (req, res) => {
  const db = readDb();
  const index = db.users.findIndex(u => u.id === req.user.id);
  if (index < 0) return res.status(404).json({ message: 'Usuário não encontrado.' });

  const allowed = ['name', 'birthDate', 'email', 'phone', 'registration'];
  allowed.forEach(key => {
    if (req.body[key] !== undefined) db.users[index][key] = req.body[key];
  });

  const { password, ...safe } = db.users[index];
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ user: safe });
});

module.exports = router;