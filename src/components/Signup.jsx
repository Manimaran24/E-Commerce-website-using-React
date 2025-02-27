import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        password: ''
    });

    const validateForm = () => {
        let valid = true;
        let newError = { name: '', email: '', password: '' };

        // Name Validation
        if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
            newError.name = 'Name must contain only letters';
            valid = false;
        } else if (formData.name.trim().length < 3) {
            newError.name = 'Name must be at least 3 characters';
            valid = false;
        }

        
        if (!validator.isEmail(formData.email.trim())) {
            newError.email = 'Enter a valid email!';
            valid = false;
        }

        // Password Validation
        if (formData.password.length < 6) {
            newError.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setError(newError); // Update the error state
        return valid; // Return validation status
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; //stop
        }

        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(formData));

        navigate('/login');
    };

    return (
        <div className='signup-container'>
            <h3>Sign Up</h3>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className='inputGroup'>
                    <label htmlFor='name'>Name</label>
                    <input className='signup-field'
                        type='text'
                        id='name'
                        autoComplete='on'
                        placeholder='Enter your name...'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {error.name && <p className="error-message">{error.name}</p>} 

                    <label className='signup-label' htmlFor='email'>Email</label>
                    <input className='signup-field'
                        type='email'
                        id='email'
                        autoComplete='on'
                        placeholder='Enter your email...'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {error.email && <p className="error-message">{error.email}</p>} 

                    <label className='signup-label' htmlFor='password'>Password</label>
                    <input className='signup-field'
                        type='password'
                        id='password'
                        autoComplete='off'
                        placeholder='Enter your password...'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {error.password && <p className="error-message">{error.password}</p>}

                    <button type='submit' className='signup-button'>
                        Signup
                    </button>
                </div>
            </form>
            <div className='Login'>
                <p>Already have an account?</p>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}

export default Signup;
