import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { dateFormat } from '../../components/Format';
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
    render : time => dateFormat(time)
  },
  // {
  //   title: 'Action',
  //   key: 'operation',
  //   fixed: 'right',
  //   width: 100,
  //   render: () => <a>action</a>,
  // },
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
    }, [id])
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