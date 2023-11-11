// import '../scss/components/JoinRoom.scss'
// import React, { useState } from 'react';
// import { Button, Modal, Space, Input, List, Avatar } from 'antd';

// const data = [
//   {
//     title: 'Exam 1',
//   },
//   {
//     title: 'Exam 2',
//   },
//   {
//     title: 'Exam 3',
//   },
//   {
//     title: 'Exam 4',
//   },
// ];

// const JoinRoom = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [passwordVisible, setPasswordVisible] = React.useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   const openModalOnItemClick = (item) => {
//     setSelectedItem(item);
//     showModal();
//   };
//   return (
//     <>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//         <List
//         style={{ width: '50%', border: '1px solid #e8e8e8', borderRadius: '5px', padding: '10px' }}
//         itemLayout="horizontal"
//         dataSource={data}
//         renderItem={(item, index) => (
//           <List.Item onClick={() => openModalOnItemClick(item)}>
//             <List.Item.Meta
//               title={<a>{item.title}</a>}
//               description="Vui Lòng xem kĩ phòng thi khi vào"
//             />
//           </List.Item>
//         )}
//         />
//       </div>
      
//       <Modal title="Nhập mật khẩu để vào phòng thi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//         <Space direction="vertical">
//           <Input.Password placeholder="input password" style={{ width: '470px' }} />
//         </Space>
//       </Modal>
//     </>

//   );
// };

// export default JoinRoom;