import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });


    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            
            // Log the full response data to inspect it
            console.log('Login Response Data:', response.data);
            console.log("User role:", response.data.role);

            // Check if token exists in the response (token might be under different keys like accessToken)
            const token = response.data.token || response.data.accessToken;
            const role = response.data.role; // Assuming the role is included in the response

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role); // Store the user role
                console.log('Token saved in localStorage:', localStorage.getItem('token'));
            } else {
                console.error('Token not found in the response');
            }
        } catch (error) {
            if (error.response) {
                console.error('Login error - response:', error.response.data);
            } else if (error.request) {
                console.error('Login error - request:', error.request);
            } else {
                console.error('Login error:', error.message);
            }
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
