import React, { useEffect, useState } from 'react';
import '../../scss/pages/student/Exams.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exams');
        setExams(response.data);
        setFilteredExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    // Filter exams based on the searchTerm
    const filteredExams = exams.filter((item) =>
      item.examName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExams(filteredExams);
  }, [searchTerm, exams]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="Exams">
      <div className="header-exams">
        <div className="text-exams">
          <h1>Bài thi của tôi</h1>
        </div>
        <div className="filter-exams">
          {/* <select>
            <option>Tất cả</option>
            <option>Toán</option>
            <option>Tiếng Anh</option>
            <option>Tin học</option>
          </select> */}
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="body-exams">
        {filteredExams.map((items) => (
          <div className="exams" key={items._id}>
            <Link to={`/exams/${items._id}`} style={{ textDecoration: 'none' }}>
              {items.examName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
