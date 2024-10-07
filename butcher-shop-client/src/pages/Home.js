import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home({ setUsername }) {
    const [formType, setFormType] = useState('login'); // 'login' or 'register'
    const [email, setEmailInput] = useState(''); // Change username to email
    const [password, setPasswordInput] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;

            if (formType === 'login') {
                // Handle login
                response = await axios.post('http://localhost:5000/api/auth/login', {
                    email,
                    password,
                });

                // Set the username and token in local storage or state
                setUsername(response.data.username); // Store the username if needed
                localStorage.setItem('token', response.data.token); // Store the token for future requests

                // Redirect based on role
                if (response.data.role === 'admin') {
                    navigate('/admin'); // Redirect to admin page
                } else {
                    navigate('/products'); // Redirect to products page for regular users
                }
            } else {
                // Handle registration
                response = await axios.post('http://localhost:5000/api/auth/register', {
                    username: email.split('@')[0], // Use email prefix as username
                    email,
                    password,
                });

                setUsername(response.data.username); // Optional if you want to store the username
                navigate('/products'); // Redirect to products page after registration
            }
        } catch (error) {
            console.error(error);
            alert('Error: ' + (error.response?.data?.message || 'Something went wrong.'));
        }
    };

    return (
        <div>
            <h1>Welcome to the Butcher Shop</h1>
            <button onClick={() => setFormType('login')}>Login</button>
            <button onClick={() => setFormType('register')}>Register</button>

            <form onSubmit={handleSubmit}>
                {/* Update input fields */}
                <input
                    type="email" // Change to email type for validation
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                />
                <button type="submit">{formType === 'login' ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
}

export default Home;
