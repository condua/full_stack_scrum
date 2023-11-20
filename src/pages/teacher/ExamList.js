import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../scss/pages/teacher/ExamList.scss'

const ExamList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch the list of exams from the API
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exams');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className='Exam_list'>
      <h2>Exam List</h2>
      <button>
      <Link to={"/teacher/exams"}>
        Add Exam
      </Link>
      </button>
     
      <table className='tableList'>
        <thead>
          <td>Stt</td>
          <td>Name</td>
          <td>Action</td>
        </thead>
        <tbody>
        {
          exams.map((exam, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>
            <Link to={`/teacher/examslist/edit/${exam._id}`}>
              {exam.examName}
            </Link>
            </td>
            <td>
            <Link to={`/teacher/list-submits/${exam._id}`}>
              View
            </Link>
            </td>
          </tr>
        ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default ExamList;
