import React, {useState,useEffect} from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ExamListAll = () =>{ 
    const [exams, setExams] = useState([]);
    const [data, setData] = useState([])
    const columns = [
        {
            title: 'STT',
            width: '10%',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên bài thi',
            width: '30%',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Thời gian thi',
            width: '30%',
            dataIndex: 'createdAt',
            key: 'time',
            fixed: 'left',
        },
        {
            // title: 'Chỉnh sửa',
            key: 'operation',
            fixed: 'right',
            width: '30%',
            render: () => <Link  to={`/teacher/examslist/edit/${data._id}`}>Chỉnh sửa</Link>,
        },
        {
            // title: 'Danh sách các bài nộp',
            key: 'operation',
            fixed: 'right',
            width: '30%',
            render: () => <Link>Danh sách các bài nộp</Link>,
        },
    ];
    // const data = [
    //     {
    //         key: '1',
    //         name: 'PPL',
    //         time: '9h00 11/11/2023',
    //     },
    //     {
    //         key: '2',
    //         name: 'DSA',
    //         time: '10h00 11/11/2023',
    //     },
    // ];
    useEffect(() => {
      // Fetch the list of exams from the API
      const fetchExams = async () => {
        try {
          const response = await axios.get('http://localhost:8800/api/exam');
        //   setExams(response.data);
          setData(response.data.data.exam)
        } catch (error) {
          console.error('Error fetching exams:', error);
        }
      };
  
      fetchExams();
    }, []);
    return(
    <div style={{ width: '60%', margin: 'auto'}}>
        <h2 style={{ textAlign: 'center' }}>Danh sách các bài thi</h2>
        <Table
            columns={columns}
            dataSource={data}
            scroll={{
                x: 900,
            }}
        />
    </div>
)};
export default ExamListAll;