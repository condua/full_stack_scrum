const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

chai.use(chaiHttp);

describe('GET /exams/:id', () => {
  // lấy được nội dung bài thi
  it('should get a single exam by ID', async () => {
    const validExamId = '656d4033db5461436653852e';

    const res = await chai.request(app).get(`/exams/${validExamId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('exam');
  },10000);
  it('should get a single exam by ID', async () => {
    const validExamId = '656d4b6bc8f997db4644d552';

    const res = await chai.request(app).get(`/exams/${validExamId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('exam');
  },10000);
  it('should get a single exam by ID', async () => {
    const validExamId = '656cd9eeab4d8d037b6a8258';

    const res = await chai.request(app).get(`/exams/${validExamId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('exam');
  },10000);

  // không lấy được nội dung bài thi
  it('should return 404 for non-existent exam ID', async () => {
    const nonExistentExamId = 'udfghuverhggreg2354353';

    const res = await chai.request(app).get(`/exams/${nonExistentExamId}`);
    expect(res).to.have.status(404);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').equal('Exam not found');
  },10000);
  it('should return 404 for non-existent exam ID', async () => {
    const nonExistentExamId = '123';

    const res = await chai.request(app).get(`/exams/${nonExistentExamId}`);
    expect(res).to.have.status(404);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').equal('Exam not found');
  },10000);
  it('should return 404 for non-existent exam ID', async () => {
    const nonExistentExamId = 'abc';

    const res = await chai.request(app).get(`/exams/${nonExistentExamId}`);
    expect(res).to.have.status(404);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').equal('Exam not found');
  },10000);
});
