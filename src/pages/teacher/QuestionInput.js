import React, { useState } from 'react';
import '../../scss/pages/teacher/QuestionInput.scss'

const QuestionInput = ({ index, questionData, onChange, onDelete }) => {
  const [questionContent, setQuestionContent] = useState(questionData.questionContent);
  const [options, setOptions] = useState(questionData.options);

  const handleAddOption = () => {
    setOptions([...options, { option: '', isCorrect: false }]);
  };

  const handleOptionChange = (optionIndex, newOption) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex] = newOption;
    setOptions(updatedOptions);
    onChange(index, { questionContent, options: updatedOptions });
  };

  const handleQuestionChange = () => {
    onChange(index, { questionContent, options });
  };

  const handleDeleteQuestion = () => {
    onDelete(index);
  };

  const handleDeleteOption = (optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions.splice(optionIndex, 1);
    setOptions(updatedOptions);
    onChange(index, { questionContent, options: updatedOptions });
  };

  return (
    <div className='QuestionInput'>
      <div className='question_content'>
        <span style={{width:'150px'}}>Question Content:</span>
        <input type="text" value={questionContent} onChange={(e) => setQuestionContent(e.target.value)} onBlur={handleQuestionChange} />
        <button onClick={handleAddOption}>Add Option</button>
        <button onClick={handleDeleteQuestion}>Delete Question</button>

      </div>
      {options.map((option, optionIndex) => (
        <div key={optionIndex} style={{display:'flex',flexDirection:'row'}}>
          <label className='option'>
            <span style={{width:'150px'}}>Option:</span>
            <input
              type="text"
              value={option.option}
              onChange={(e) => handleOptionChange(optionIndex, { ...option, option: e.target.value })}
              onBlur={handleQuestionChange}
            />
            <span style={{width:'80px',paddingLeft:'20px'}}>Is correct:</span>
            <input
              style={{width:'30px'}}
              type="checkbox"
              checked={option.isCorrect}
              onChange={(e) => handleOptionChange(optionIndex, { ...option, isCorrect: e.target.checked })}
              onBlur={handleQuestionChange}
            />
            <button onClick={() => handleDeleteOption(optionIndex)}>Delete Option</button>

          </label>
          {/* <label>
            Is Correct:
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={(e) => handleOptionChange(optionIndex, { ...option, isCorrect: e.target.checked })}
              onBlur={handleQuestionChange}
            />
          </label> */}
        </div>
      ))}
    </div>
  );
};

export default QuestionInput;
