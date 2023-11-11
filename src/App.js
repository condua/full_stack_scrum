import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import JoinRoom from './pages/JoinRoom';
import Exams from './pages/student/Exams';
import ExamDetails from './pages/student/ExamDetails';
import CreateExam from './pages/teacher/CreateExam';

import ExamList from './pages/teacher/ExamList';
import EditQuestion from './pages/teacher/EditQuestion';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/exams' element={<Exams/>}/>
        <Route path='/exams/:id' element={<ExamDetails/>}/>

        <Route path='/teacher/exams' element={<CreateExam/>}/>

        <Route path="/teacher/examslist" element={<ExamList/>} />

        <Route path="/teacher/examslist/edit/:id" element={<EditQuestion/>} />
        {/* <Route path='/joinroom' element={<JoinRoom/>}/> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
