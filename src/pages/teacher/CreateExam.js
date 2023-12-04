import React, { useState } from 'react';
import axios from 'axios';
import QuestionInput from './QuestionInput';
import '../../scss/pages/teacher/CreateExams.scss'
import { useNavigate } from 'react-router-dom';
const CreateExam = () => {
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate()

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionContent: '', options: [] }]);
  };

  //hàm xử lý thay đổi question
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
      // document.querySelector('.success-message');
      const successMessageElement = document.createElement('div');
      successMessageElement.className = 'success-message';
      successMessageElement.innerText = 'Tạo bài thi thành công';
    
      // Thêm phần tử vào body của trang web
      document.body.appendChild(successMessageElement);
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
        <input id='exam-name' type="text" value={examName} onChange={(e) => setExamName(e.target.value)} />
        <button id='add-question' onClick={handleAddQuestion}>Add Question</button>
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
        <button id='button-create' style={{padding:'10px',borderRadius:'10px'}} className='button_create' onClick={handleSubmit}>Create Exam</button>
        <button style={{padding:'10px',borderRadius:'10px',marginLeft:'30px'}} className='button_create' onClick={()=>navigate('/teacher/examslist')}>Back home</button>

      </div>
    </div>
  );
};

export default CreateExam;
