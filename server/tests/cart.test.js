const request = require('supertest');
const express = require('express');
const cartRoutes = require('../routes/cart');
const { readDb, writeDb } = require('../utils/db');

// Mock db functions
jest.mock('../utils/db', () => ({
  readDb: jest.fn(),
  writeDb: jest.fn(),
}));

// Mock auth middleware
jest.mock('../utils/auth', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 'test-user-id' };
    next();
  },
}));

const app = express();
app.use(express.json());
app.use('/api/cart', cartRoutes);

describe('Cart Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/cart', () => {
    it('should get user cart', async () => {
      const mockCart = {
        userId: 'test-user-id',
        items: [
          { id: '1', name: 'Test Product', price: 99.99, quantity: 1 },
        ],
      };

      readDb.mockResolvedValue({
        carts: [mockCart],
      });

      const res = await request(app).get('/api/cart');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockCart.items);
    });
  });

  describe('POST /api/cart/add', () => {
    it('should add item to cart', async () => {
      const mockProduct = { id: '1', name: 'Test Product', price: 99.99 };
      
      readDb.mockResolvedValue({
        products: [mockProduct],
        carts: [],
      });

      const res = await request(app)
        .post('/api/cart/add')
        .send({ productId: '1', quantity: 1 });

      expect(res.status).toBe(200);
      expect(writeDb).toHaveBeenCalled();
    });
  });
});