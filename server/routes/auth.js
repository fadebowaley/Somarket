const express = require('express');
const bcrypt = require('bcryptjs');
const { readDb, writeDb } = require('../utils/db');
const { generateToken } = require('../utils/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const db = await readDb();
    
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword
    };

    db.users.push(user);
    await writeDb(db);

    const token = generateToken(user);
    console.log(user);
    res.json({ token, user: { id: user.id, email, name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await readDb();
    const user = db.users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;