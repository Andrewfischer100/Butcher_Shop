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
    
            // Ensure you are accessing the role correctly
            const token = response.data.token || response.data.accessToken; 
            const role = response.data.user?.role; // Use optional chaining to avoid errors if user is undefined
    
            if (token) {
                // Store token and role in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('role', role); // Store the user role
                console.log('Token saved in localStorage:', localStorage.getItem('token'));
                console.log('User role saved in localStorage:', localStorage.getItem('role'));
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
    
        

  
};

export default Login;
