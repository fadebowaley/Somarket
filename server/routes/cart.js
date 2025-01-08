const express = require('express');
const { readDb, writeDb } = require('../utils/db');
const { verifyToken } = require('../utils/auth');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const db = await readDb();
    const cart = db.carts.find(c => c.userId === req.user.id) || { userId: req.user.id, items: [] };
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const db = await readDb();
    
    const product = db.products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = db.carts.find(c => c.userId === req.user.id);
    if (!cart) {
      cart = { userId: req.user.id, items: [] };
      db.carts.push(cart);
    }

    const existingItem = cart.items.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ ...product, quantity });
    }

    await writeDb(db);
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/update', verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const db = await readDb();
    
    const cart = db.carts.find(c => c.userId === req.user.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(item => item.id !== productId);
    } else {
      const item = cart.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    }

    await writeDb(db);
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/clear', verifyToken, async (req, res) => {
  try {
    const db = await readDb();
    const cart = db.carts.find(c => c.userId === req.user.id);
    if (cart) {
      cart.items = [];
      await writeDb(db);
    }
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;