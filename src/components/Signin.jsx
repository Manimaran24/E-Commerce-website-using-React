import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signin({ setSignedin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    //  user exists
    const foundUser = storedUsers.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      localStorage.setItem('loginUser', JSON.stringify(foundUser)); 
      localStorage.setItem('Status', 'true'); 
      setSignedin(true);
      alert("Login successful!");
      navigate('/Store'); 
    } else {
      alert("Invalid credentials! Please sign up first.");
      navigate('/Signup'); 
    }
  };

  return (
    <div className='signin-container'>
      <h3>Sign In</h3>
      <form className='signin-form' onSubmit={handleSubmit}>
        <div className='inputGroup'>
          <label className='signin-label' htmlFor='email'>Email:</label>
          <input className='signin-field'
            type='email'
            id='email'
            autoComplete='on'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className='signin-label' htmlFor='password'>Password:</label>
          <input className='signin-field'
            type='password'
            id='password'
            autoComplete='off'
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type='submit' className='signin-button'>Signin</button>
        </div>
      </form>
      <div className='Login'>
        <p>Don't have an account?</p>
        <Link to='/signup'>
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Signin;
