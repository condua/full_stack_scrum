import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const columns = [
  {
    title: 'STT',
    width: 60,
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Full Name',
    width: 250,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Điểm',
    width: 100,
    dataIndex: 'score',
    key: 'score',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: '1',
  },
  {
    title: 'Thời gian nộp bài',
    dataIndex: 'time',
    key: '2',
  },
  // {
  //   title: 'Action',
  //   key: 'operation',
  //   fixed: 'right',
  //   width: 100,
  //   render: () => <a>action</a>,
  // },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    score: 32,
    email: 'New York Park',
    time: '9h00 11/11/2023'
  },
  {
    key: '2',
    name: 'Jim Green',
    score: 40,
    email: 'London Park',
    time: '9h00 11/11/2023'
  },
];
const examname = 'PPL';
const StudentTable = () => {
    const [submits, setSubmit] = useState([]);

    const {id} = useParams()
    useEffect(() => {
        const fetchSubmits = async () => {
            const res = await axios.get(`http://localhost:5000/exam/${id}`);
            setSubmit(res.data);
        }
        fetchSubmits();
    }, [])
    return (
        <div>
          <h2 style={{ textAlign: 'center' }}>{examname}</h2>
          <button><Link to={'/teacher/examslist'}>
            back
          </Link></button>
          <Table
            columns={columns}
            dataSource={submits}
            scroll={{
              x: 1300,
            }}
          />
        </div>
      );
};
export default StudentTable;