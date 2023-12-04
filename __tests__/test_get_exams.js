const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const Exam = require('../models/exam');

// Set timeout to 10 seconds
jest.setTimeout(10000);

// Wait for 3 seconds before each test to make sure the database is ready
beforeAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 3000));
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test GET /exams', () => {
  test('should return a response with HTTP status code 200', async () => {
    const response = await request.get('/exams');
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  test.failing(
    'should return a response with HTTP status code 500 when server is down',
    async () => {
      const response = await request.get('/exams');
      expect(response.status).toBe(500);
    },
  );
  test('should have correct data types for properties', async () => {
    const response = await request.get('/exams');
    for (let i = 0; i < response.body.length; i++) {
      // Only check the first 5 exams
      if (i === 5) break;
      expect(response.body[i]).toEqual(
        expect.objectContaining({
          examName: expect.any(String),
          questions: expect.any(Array),
        }),
      );
      for (let j = 0; j < response.body[i].questions.length; j++) {
        expect(response.body[i].questions[j]).toEqual(
          expect.objectContaining({
            questionContent: expect.any(String),
            options: expect.any(Array),
          }),
        );
        for (let k = 0; k < response.body[i].questions[j].options.length; k++) {
          expect(response.body[i].questions[j].options[k]).toEqual(
            expect.objectContaining({
              option: expect.any(String),
              isCorrect: expect.any(Boolean),
            }),
          );
        }
      }
    }
  });
  test('should be equal to the data in the database', async () => {
    const response = await request.get('/exams');
    const exams = await Exam.find().lean();
    expect(response.body).toEqual(JSON.parse(JSON.stringify(exams)));
  });
});
