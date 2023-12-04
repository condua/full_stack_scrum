const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const Exam = require('../models/exam');

// Wait for 3 seconds before each test to make sure the database is ready
beforeAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 3000));
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test POST /exam/submit', () => {
  test('return status 500 when having no body', async () => {
    const response = await request.post('/exam/submit');
    expect(response.status).toBe(500);
    expect(response.body).not.toBeNull();
  });
  test('return status 500 when having no body', async () => {
    const response = await request.post('/exam/submit').send({examId: "", userId: "", score: ""});
    expect(response.status).toBe(500);
    expect(response.body).not.toBeNull();
  });
  test('return status 200', async () => {
    const response = await request.post('/exam/submit').send({examId: "656cd81ad47cd9c6a0a73e99", userId: "656d51ed90b3b3df78ab1f40", score: "10"});
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  test('return status 500 when not exist userId', async () => {
    const response = await request.post('/exam/submit').send({examId: "656cd81ad47cd9c6a0a73e99", userId: "656d51eb3b3df78ab1f40", score: "10"});
    expect(response.status).toBe(500);
    expect(response.body).not.toBeNull();
  });
  test('return status 500 when not exist examId', async () => {
    const response = await request.post('/exam/submit').send({examId: "656cd81ad47cd9c6a99", userId: "656d51ed90b3b3df78ab1f40", score: "10"});
    expect(response.status).toBe(500);
    expect(response.body).not.toBeNull();
  });
});
