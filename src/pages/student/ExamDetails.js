import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../scss/pages/student/ExamDetails.scss'

const ExamDetails = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId");
  if (!userId) navigate('/login');
  const handleAnswerChange = (questionId, isCorrect) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { isCorrect },
    }));
  };
  // const questionIds = Object.keys(answers);
  // console.log(questionIds.length)
  const handleSubmit = async () => {
    let score = 0;
    const questionIds = Object.keys(answers);
    for (let i = 0; i < questionIds.length; i++) {
      const questionId = questionIds[i];
      const userAnswer = answers[questionId];
      if (userAnswer && userAnswer.isCorrect) {
        score++;
      }
    }
    const totalQuestions = exam.questions.length
    const adjustedScore = ((score / totalQuestions) * 10);
    //console.log(totalQuestions)
   

    const res = await  axios.post("http://localhost:5000/exam/submit",{
      userId,
      examId: id,
      score: adjustedScore
    })
    alert(`Your score: ${adjustedScore}`);
    navigate("/exams")

  };

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/exams/${id}`);
        setExam(response.data.exam);
        console.log(response.data.exam.questions.length)
      } catch (error) {
        console.error('Error fetching exam details:', error);
        alert(error)
      }
    };

    fetchExamDetails();
  }, [id]);

  return (
    <div className='ExamDetails'>
      {exam ? (
        <div>
          <h1 style={{textAlign:'center'}}>{exam.examName}</h1>
          {exam.questions.map((question,index) => (
            <div key={question._id}>
              <h3>{index+1}. {question.questionContent}</h3>
              {question.options.map((option) => (
                <div key={option._id}>
                  <input
                    type='radio'
                    name={question._id}
                    id={option._id}
                    onClick={() => handleAnswerChange(question._id, option.isCorrect)}
                  />
                  <label htmlFor={option._id}>{option.option}</label>
                </div>
              ))}
            </div>
          ))}
          <div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center'}}>
            <button className='submit-button' onClick={handleSubmit}>Nộp bài</button>
          </div>
          {/* <p>Điểm của bạn: {grade}</p> */}
        </div>
      ) : (
        <div>Xin lỗi, trang này không có gì</div>
      )}
    </div>
  );
};

export default ExamDetails;
