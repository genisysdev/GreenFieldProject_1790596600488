const request = require('supertest');
const app = require('../index');

describe('Auth API Unit Tests', () => {
  it('should validate email format and reject invalid emails', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'invalid-email',
      password: 'securePassword123'
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});