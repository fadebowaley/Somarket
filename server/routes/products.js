const express = require('express');
const { readDb, writeDb } = require('../utils/db');
const { verifyToken } = require('../utils/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const db = await readDb();
    
    const product = {
      id: Date.now().toString(),
      name,
      price,
      description,
      image
    };

    db.products.push(product);
    await writeDb(db);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;