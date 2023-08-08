import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginFunctions = () => {
    const [error, setError] = useState("");
    // const [credentials, setCredentials] = useState({
    //     user_email: '',
    //     user_password: '',
    // });

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setCredentials({
    //         ...credentials,
    //         [name]: value,
    //     });

    //     // Validate email format here
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(value)) {
    //         setError("Please enter a valid email address");
    //     } else {
    //         setError("");
    //     }
    // };

    // const navigate = useNavigate();

    const isLoggedIn = () => {
        // Check if the token exists in local storage
        const token = localStorage.getItem('token');
        return token ? true : false;
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:5151/Login/login', credentials);
    //         console.log(response);
    //         // Access the token from the response data
    //         const token = response.data.token;
    //         console.log(token);
    //         // Save the token in local storage or a cookie for future use
    //         localStorage.setItem('token', token);
    //         console.log(token);

    //         // Check if token is valid and user is logged in
    //         if (token && isLoggedIn()) {
    //             // Redirect to Home page or perform any desired action
    //             navigate("/Landing");
    //         }
    //     } catch (error) {
    //         // Handle the error from the backend and display appropriate message
    //         if (error.response && error.response.status === 401) {
    //             setError("Incorrect email or password");
    //         } else {
    //             setError("An error occurred. Please try again later.");
    //         }
    //     }
    // };

    return {
        isLoggedIn
    };
};

export default LoginFunctions;
