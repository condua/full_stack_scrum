import React, { useState } from 'react';
import axios from 'axios';
import '../scss/components/Register.scss';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [fullname, setFullname] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== repassword)
    {
        alert('Passwords do not match')
    }
    try {
      const response = await axios.post('http://localhost:5000/register', {
        fullname,
        email,
        password,
        role: 'student', // Set the role here
      });
      console.log(response.data);
      alert(response.data.message);
      navigate("/login")
    } catch (error) {
      console.error('Error registering user:', error.response.data.error);
      alert(error.response.data.error)
    }
  };

  return (
    <div className="Register">
      <div className="Form-container">
        <div>
          <h1 style={{marginBottom:'10px'}}>Register</h1>
        </div>
        <div className="Form">
          <p>Fullname</p>
          <input
            placeholder="Your Fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <p>Email</p>
          <input
            placeholder="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>Password</p>
          <input
            placeholder="Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p>Re-Password</p>
          <input
            placeholder="Re-Password"
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />

          <br />
          <button className="button-login" onClick={handleSubmit}>
            Sign Up
          </button>
          <Link style={{marginTop:'10px'}} to={'/login'}> Do you already have an account ? <span style={{color:'blue'}}>Login</span></Link>

        </div>
      </div>
    </div>
  );
};

export default Register;
