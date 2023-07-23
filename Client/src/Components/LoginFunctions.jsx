import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Home from './Home';

const LoginFunctions = () => {
    const [credentials, setCredentials] = useState({
        user_email: '',
        user_password: '',

    });

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const isLoggedIn = () => {
        // Check if the token exists in local storage
        const token = localStorage.getItem('token');
        // Perform any additional checks if needed
        // For example, you can decode the token and check its expiration date
        // Return true or false based on the checks
        return token ? true : false;
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5151/Login/login', credentials);
            console.log(response);
            // Access the token from the response data
            const token = response.data.token;
            console.log(token);
            // Save the token in local storage or a cookie for future use
            localStorage.setItem('token', token);
            console.log(token);

            // Check if token is valid and user is logged in
            if (token && isLoggedIn()) {
                // Redirect to Home page or perform any desired action
                // navigate("/")
            }
            window.location = '/Landing';
            // Redirect or perform any desired action after successful login
        } catch (error) {
            console.error('Error: Wrong email or password', error.message);
        }
    };

    return {
        credentials,
        handleChange,
        handleSubmit,
    };
};
export default LoginFunctions;