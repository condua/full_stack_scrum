const chai = require('chai');
const chaiHttp = require('chai-http');
const sever = require('./server');

chai.use(chaiHttp);
const expect = chai.expect;
const API = 'http://localhost:5000'
describe('POST /exams', () => {
  it('should create a new exam', async () => {
    const newExamData = {
      examName: 'Sample Exam',
      questions: [
        {
          questionContent: 'What is 2+2?',
          options: [
            { option: '3', isCorrect: false },
            { option: '4', isCorrect: true },
            { option: '5', isCorrect: false },
          ],
        },
      ],
    };

    const response = await chai
      .request(API)
      .post('/exams')
      .send(newExamData);

    expect(response).to.have.status(201);
    expect(response.body.message).to.equal('Exam created successfully');
    // expect(response.body.exam.examName).to.equal('Sample Exam');
    // expect(response.body.exam.questions.length).to.equal(1);
  },100000);

  it('should handle errors when creating an exam', async () => {
    const invalidExamData = {
      questions: [
        {
          questionContent: 'What is 2+2?',
          options: [
            { option: '3', isCorrect: false },
            { option: '4', isCorrect: true },
            { option: '5', isCorrect: false },
          ],
        },
      ],
    };

    const response = await chai
      .request(API)
      .post('/exams')
      .send(invalidExamData);

    expect(response).to.have.status(500);
    expect(response.body.error).to.equal('Internal server error');
  },100000);
});
