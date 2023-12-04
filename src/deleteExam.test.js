import { strictEqual } from 'assert';
import axios from 'axios';

const examName = 'API Tests';
const questions = [];
const expectedCreateExam = 'Exam created successfully';
const expectedCDeteleExam = 'Exam deleted successfully';

describe('API Exam Tests 1', function () {
  var result;
  it('create-exam', async () => {
    await axios.post('http://localhost:5000/exams', {examName, questions,})
    .then(res => {
      result = res.data.message;
    });
    strictEqual(result, expectedCreateExam);
  });

  // it('delete exam', async () => {
  //   await axios.delete('http://localhost:5000/exams/656d6b41b6227d83961b35c7')
  //   .then(res => {
  //     result = res.data.message;
  //   });
  //   strictEqual(result, expectedCDeteleExam);
  // });
});

describe('API Exam Tests 2', function () {
  var result;

  it('delete exam', async () => {
    await axios.delete('http://localhost:5000/exams/656d6b41b6227d83961b35c7')
    .then(res => {
      result = res.data.message;
      console.log(result)
    });
    strictEqual(result, 'Exam not found');
  });
});

