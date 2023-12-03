const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

// Wait for 3 seconds before each test to make sure the database is ready
beforeAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 3000));
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test /', () => {
  it('should return a response', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello NODE API');
  });
});
