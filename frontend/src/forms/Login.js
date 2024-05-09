import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ toggleForms, loginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password
      });
      if (response.status === 200) {
        console.log('Login success:', response.data);
        loginSuccess();
        navigate('/admin'); // Redirect to admin panel after successful login
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      // Handle specific error messages or generic error
      setErrorMessage(error.response ? error.response.data.message : 'Invalid email or password!');
    }
  };

  return (
    <div className='Login'>
        <form className='form' onSubmit={handleSubmit}>
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
                <button type="submit" className='form-btn-inputs'>Login</button>
                <button type="button" onClick={toggleForms}>Need an account? Sign Up</button>
            </div>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;
