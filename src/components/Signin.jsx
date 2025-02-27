
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


function Login({setSignedin}) {
  const navigate=useNavigate();
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser.email === formData.email &&
    storedUser.password === formData.password) {
      
     
      setSignedin(true);
      navigate("/");
    }else {
      
alert("please signup")
    
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
            autoComplete='on'
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          
         
          <button type='submit' className='signin-button'>Signin</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      <div className='Login'>
        <p>Don't have an account?</p>
        <Link to='/Signup'>
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
