import React, { useState } from 'react';
import axios from 'axios';
import QuestionInput from './QuestionInput';
import '../../scss/pages/teacher/CreateExams.scss'
const CreateExam = () => {
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionContent: '', options: [] }]);
  };

  const handleQuestionChange = (index, questionData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = questionData;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/exams', {
        examName,
        questions,
      });
      
      console.log(response.data);
      alert('Tạo bài thi thành công')
      setQuestions([])
    } catch (error) {
      console.error('Error creating exam:', error);
    }
  };

  return (
    <div className='CreateExams'>
      <h2>Create Exam</h2>
      <div className='exam_name'>
        <span>Exam name: </span>
        <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      {questions.map((question, index) => (
        <QuestionInput
          key={index}
          index={index}
          questionData={question}
          onChange={handleQuestionChange}
          onDelete={handleDeleteQuestion}
        />
      ))}
      <div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px',marginTop:'10px'}}>
        <button style={{padding:'10px',borderRadius:'10px'}} className='button_create' onClick={handleSubmit}>Create Exam</button>
      </div>
    </div>
  );
};

export default CreateExam;
