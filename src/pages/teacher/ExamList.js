import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>Exam List</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id}>
            {/* Link to the EditExam page for the specific exam */}
            <Link to={`/teacher/examslist/edit/${exam._id}`}>
              {exam.examName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
