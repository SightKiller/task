import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ toggleForms, loginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        name: name,
        email: email,
        password: password
      });
      if (response.status === 200) {
        toast.success('Sign up successful!', { position: "top-center" });
        loginSuccess();
        navigate('/');  // Redirecting to user's dashboard or other initial page after signup
      }
    } catch (error) {
      if (error.response) {
        // Checking specific status code from backend, assuming 409 for duplicate email
        if (error.response.status === 409) {
          toast.error('Email already in use. Please log in or use another email.', { position: "top-center" });
        } else {
          toast.error('Sign up failed. Please try again.', { position: "top-center" });
        }
      } else {
        console.error('Sign up error:', error.message);
        toast.error('Network error or server is down.', { position: "top-center" });
      }
    }
  };

  return (
    <div className='Login'>
      <ToastContainer />
      <form className='form' onSubmit={handleSubmit}>
        <div className="form-elements">
          <label htmlFor="name">Name</label>
          <input
            className='form-inputs'
            type="text"
            placeholder='Enter your Name'
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-elements">
          <label htmlFor="email">Email</label>
          <input
            className='form-inputs'
            type="email"
            placeholder='Enter your Email'
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-elements">
          <label htmlFor="password">Password</label>
          <input
            className='form-inputs'
            type="password"
            placeholder='Enter your Password'
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-btn">
          <button type="submit" className='form-btn-inputs'>Sign In</button>
          <button type="button" onClick={toggleForms}>Already have an account? Login</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
