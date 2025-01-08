const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const { readDb, writeDb } = require('../utils/db');

// Mock db functions
jest.mock('../utils/db', () => ({
  readDb: jest.fn(),
  writeDb: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      readDb.mockResolvedValue({ users: [] });
      writeDb.mockResolvedValue();

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toBe('test@example.com');
    });

    it('should not register with existing email', async () => {
      readDb.mockResolvedValue({
        users: [{ email: 'test@example.com' }],
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});