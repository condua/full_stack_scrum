import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/components/Login.scss'
import data from '../json/password.json'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle successful login, e.g., redirect the user or store authentication token in the state
        try {
          const response = await axios.post('http://localhost:5000/login', {
            email: email,
            password: password,
          });
    
          console.log('Login successful!', response.data);
          const role = response.data.user.role;
          const userId = response.data.user._id;
          // Save the role in localStorage
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', userId);
          if (role=='teacher'){
            navigate('/teacher/examslist')
          } else {
            navigate('/exams')
          }
        } catch (error) {
          console.error('Login failed!', error);
          alert('Wrong email or password')
          // Handle login error, e.g., display an error message to the user
        }
      };

    return (
        <div className='Login'>
            <div className='Form-container'>
                <div>
                    <h1>Login</h1>
                </div>
                <div className='Form'>
                    <p>Email</p>
                    <input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

                    <p>Password</p>
                    <input placeholder='Password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    <br/>
                    <button className='button-login' onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            <Link to={'/register'}> Register</Link>
            </div>
        </div>
    );
};

export default Login;