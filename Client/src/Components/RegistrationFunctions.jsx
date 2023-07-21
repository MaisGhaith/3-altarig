import React, { useState } from 'react'
import axios from 'axios'

const RegistrationFunctions = () => {

    const [user, setUser] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        phone_number: '',
        role: 'user',
        deleted: false,
    });

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        try {
            const response = await axios.post('http://localhost:5151/Register/register', user);
            console.log(response)
            // Access the token from the response data
            const token = response.data.token;
            // Save the token in local storage or a cookie for future use
            localStorage.setItem('token', token);

            // Redirect or perform any desired action after successful registration
            // window.location.href = 'RegisterForm';
            console.log(token)
        } catch (error) {
            console.error('Error add data to database, server error:', error.message);
        }
    };

    return {
        handleChange,
        handleSubmit,
        user
    }
}

export default RegistrationFunctions