import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditExam = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const [exam, setExam] = useState({
    examName: '',
    questions: [],
  });

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/exams/${id}`);
        setExam(response.data.exam);
      } catch (error) {
        console.error('Error fetching exam details:', error);
      }
    };

    fetchExamDetails();
  }, [id]);

  const handleExamChange = (e) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (questionIndex, updatedQuestion) => {
    setExam((prevExam) => {
      const updatedQuestions = [...prevExam.questions];
      updatedQuestions[questionIndex] = updatedQuestion;
      return {
        ...prevExam,
        questions: updatedQuestions,
      };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, updatedOption) => {
    setExam((prevExam) => {
      const updatedQuestions = [...prevExam.questions];
      const updatedOptions = updatedQuestions[questionIndex].options.map((o, i) => {
        if (i === optionIndex) {
          return updatedOption;
        } else {
          // Set isCorrect to false for all other options
          return { ...o, isCorrect: false };
        }
      });
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedOptions,
      };
      return {
        ...prevExam,
        questions: updatedQuestions,
      };
    });
  };

  const handleAddQuestion = () => {
    setExam((prevExam) => ({
      ...prevExam,
      questions: [...prevExam.questions, { questionContent: '', options: [] }],
    }));
  };

  const handleAddOption = (questionIndex) => {
    setExam((prevExam) => {
      const updatedQuestions = [...prevExam.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: [...updatedQuestions[questionIndex].options, { option: '', isCorrect: false }],
      };
      return {
        ...prevExam,
        questions: updatedQuestions,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/exams/${id}`, exam);
      console.log(response.data);
      alert('Saved successfully')
      navigate('/teacher/examslist')
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  return (
    <div>
      <h2>Edit Exam {exam.examName}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Exam Name:
          <input
            type="text"
            name="examName"
            value={exam.examName}
            onChange={handleExamChange}
          />
        </label>

        {exam.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <h3>Question {questionIndex + 1}</h3>
            <label>
              Question Content:
              <input
                type="text"
                value={question.questionContent}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, {
                    ...question,
                    questionContent: e.target.value,
                  })
                }
              />
            </label>

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  Option {optionIndex + 1}:
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      handleOptionChange(questionIndex, optionIndex, {
                        ...option,
                        isCorrect: e.target.checked,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={option.option}
                    onChange={(e) =>
                      handleQuestionChange(questionIndex, {
                        ...question,
                        options: question.options.map((o, i) =>
                          i === optionIndex ? { ...o, option: e.target.value } : o
                        ),
                      })
                    }
                  />
                </label>
              </div>
            ))}

            <button type="button" onClick={() => handleAddOption(questionIndex)}>
              Add Option
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditExam;
