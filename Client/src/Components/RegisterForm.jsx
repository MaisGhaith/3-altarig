import React, { useState, useEffect } from 'react'
import axios from 'axios';
import registerFunctions from './RegistrationFunctions'
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {

    const {
        handleChange,
        // handleSubmit,
    }
        = registerFunctions();

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [path] = useState("/Landing");

    const [user, setUser] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        phone_number: '',
        role: 'user',
        deleted: false,
    });

    const [checkInput, setCheckInput] = useState({
        user_name: false,
        user_email: false,
        user_password: false,
        phone_number: false,
        confirmPassword: false,
    });

    const themeValue = {
        success: "green",
        error: "red",
        warning: "red",
        normal: "teal",
    };

    const [inputTheme, setInputTheme] = useState({
        user_email: themeValue.normal,
        user_password: themeValue.normal,
        user_name: themeValue.normal,
        phone_number: themeValue.normal,
        phone_number: themeValue.normal,
        confirmPassword: themeValue.normal,
        serial: themeValue.normal,
    });

    const [massageWarning, setMassageWarning] = useState({
        user_name: "",
        user_email: "",
        phone_number: "",
        user_password: "",
        confirmPassword: "",
        submit: "",
    });

    const [passwordMode, setPasswordMode] = useState(true);
    const [passwordModeCon, setPasswordModeCon] = useState(true);

    function handlePasswordMode() {
        setPasswordMode(!passwordMode);
    }

    function handlePasswordModeCon() {
        setPasswordModeCon(!passwordModeCon);
    }

    // const isLoggedIn = () => {
    //     // Check if the token exists in local storage
    //     const token = localStorage.getItem('token');
    //     return token ? true : false;
    // };

    function handleName(event) {
        const username = event.target.value;
        setCheckInput({ ...checkInput, user_name: false });

        if (username === "") {
            setInputTheme({ ...inputTheme, user_name: themeValue.normal });
            setMassageWarning({
                ...massageWarning,
                user_name: "Please enter a value",
            });
        } else {
            setInputTheme({ ...inputTheme, usernuser_nameame: themeValue.success });
            setMassageWarning({ ...massageWarning, user_name: "" });
            setUser({ ...user, user_name: username });
            setCheckInput({ ...checkInput, user_name: true });
        }
    }

    function handleEmail(event) {
        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
        setCheckInput({ ...checkInput, user_email: false });
        const user_email = event.target.value;

        if (user_email === "") {
            setInputTheme({ ...inputTheme, user_email: themeValue.normal });
            setMassageWarning({ ...massageWarning, user_email: "Please enter a value" });
        } else if (!patternEmail.test(user_email)) {
            setInputTheme({ ...inputTheme, user_email: themeValue.error });
            setMassageWarning({
                ...massageWarning,
                user_email: " Please enter a valid email address",
            });
        } else {
            setMassageWarning({ ...massageWarning, user_email: "" });
            setInputTheme({ ...inputTheme, user_email: themeValue.success });
            setUser({ ...user, user_email: user_email });
            setCheckInput({ ...checkInput, user_email: true });
        }
    }


    function isValidPhoneNumber(phoneNumber) {
        // Regular expression pattern for phone number validation
        const phoneNumberPattern = /^07[789]\d{7}$/;

        return phoneNumberPattern.test(phoneNumber);
    }

    function handlePhoneNumber(event) {
        const phoneNumber = event.target.value;
        setCheckInput({ ...checkInput, phone_number: false });

        if (phoneNumber === "") {
            setInputTheme({ ...inputTheme, phone_number: themeValue.normal });
            setMassageWarning({
                ...massageWarning,
                phone_number: "Please enter a value",
            });
        } else if (!isValidPhoneNumber(phoneNumber)) {
            setInputTheme({ ...inputTheme, phone_number: themeValue.error });
            setMassageWarning({
                ...massageWarning,
                phone_number: "Please enter a valid phone number",
            });
        } else {
            setInputTheme({ ...inputTheme, phone_number: themeValue.success });
            setMassageWarning({ ...massageWarning, phone_number: "" });
            setUser({ ...user, phone_number: phoneNumber });
            setCheckInput({ ...checkInput, phone_number: true });
        }
    }



    function handlePassword(event) {
        // more than 8 characters, with at least 1 number, uppercase, and special characters.
        const patternPassword =
            /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        setCheckInput({ ...checkInput, user_password: false });
        const password = event.target.value;

        if (password === "") {
            setInputTheme({ ...inputTheme, user_password: themeValue.normal });
            setMassageWarning({
                ...massageWarning,
                user_password: "Please enter a value",
            });
        } else if (!patternPassword.test(password)) {
            setInputTheme({ ...inputTheme, user_password: themeValue.error });
            setMassageWarning({
                ...massageWarning,
                user_password: `Please enter a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, one number, and one special character `,
            });
        } else {
            setMassageWarning({ ...massageWarning, user_password: "" });
            setInputTheme({ ...inputTheme, user_password: themeValue.success });
            setUser({ ...user, user_password: password });
            setCheckInput({ ...checkInput, user_password: true });
        }
    }

    function handleConfirmPassword(event) {
        const password = event.target.value;

        setCheckInput({ ...checkInput, confirmPassword: false });

        if (password === "") {
            setInputTheme({ ...inputTheme, confirmPassword: themeValue.normal });
            setMassageWarning({
                ...massageWarning,
                confirmPassword: "Please enter a value",
            });
        } else if (password !== user.user_password) {
            setInputTheme({ ...inputTheme, confirmPassword: themeValue.error });
            setMassageWarning({
                ...massageWarning,
                confirmPassword: "The password confirmation does not match",
            });
        } else {
            setMassageWarning({ ...massageWarning, confirmPassword: "" });
            setInputTheme({ ...inputTheme, confirmPassword: themeValue.success });
            setCheckInput({ ...checkInput, confirmPassword: true });
        }
    }

    const handleSubmit0 = async (event) => {
        event.preventDefault();

        if (
            checkInput.user_name &&
            checkInput.user_email &&
            checkInput.phone_number &&
            checkInput.user_password &&
            checkInput.confirmPassword
        ) {


            try {
                const res = await axios.post("http://localhost:5151/Register/register", user);
                localStorage.setItem("username", user.user_name);
                localStorage.setItem("email", user.user_email);
                localStorage.setItem("token", res.data.token);

                navigate(path);
            } catch (err) {
                setMassageWarning({
                    ...massageWarning,
                    user_email: "The email address already exists.",
                });
                console.error(err);
            }






            // sendDataToServer(user);
            // return false
        } else {
            setMassageWarning({
                ...massageWarning,
                submit: "Please enter all required fields.",
            });
            return false
        }
    }

    async function sendDataToServer(user) {
        console.log("----------------------------------")
        console.log("----------------------------------")

        return false
    }


    return (

        <div className='mt-20'>
            {/* component */}
            <div className="bg-white relative lg:py-20">
                <div
                    className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-full xl:px-5 lg:flex-row"
                >
                    <div className="flex flex-col items-center w-full pt-5 pr-5 pb-20 pl-5 lg:pt-20 lg:flex-row">
                        <div className="w-full bg-cover pl-20 relative max-w-md lg:max-w-2xl lg:w-7/12">
                            <div className="flex flex-col  items-center justify-center w-full h-full relative lg:pr-10">
                                <img
                                    src="/Images/login.png"
                                    className="hidden lg:block"
                                />
                            </div>
                        </div>
                        <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                            <div
                                className="flex flex-col items-start justify-start pt-10 pr-5 pb-10 pl-5 bg-white shadow-2xl rounded-xl
  relative z-10 "
                            >
                                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                                    التسجيل
                                </p>
                                <form onSubmit={handleSubmit0} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {/* <p class="text-sm font-normal flex justify-center text-gray-600 mb-7">التسجيل عن طريق :  </p> */}
                                    <div className='flex justify-center gap-7 mb-3'>
                                        <button className="px-4 py-2 w-36 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                                            <img
                                                className="w-6 h-6"
                                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                            <span className='text-xs'>Login with Google</span>
                                        </button>
                                        <button className="px-4 py-2 w-36 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                                            <img
                                                className="w-6 h-6"
                                                src="/Images/facebook.png"
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                            <span className='text-xs'>Login with Facebook</span>
                                        </button>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-32 sm:ml-8 md:ml-32 lg:ml-60 font-medium text-gray-600 absolute">
                                            اسم المستخدم
                                        </p>

                                        <input
                                            placeholder="اسم المستخدم"
                                            type="text"
                                            className="border placeholder-gray-400 focus:outline-none
        focus:border-black w-80 justify-center p-2 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
        border-gray-300 rounded-md"
                                            id='username'
                                            name="user_name"
                                            onChange={(event) => handleName(event)}
                                        />
                                        <span class="text-md">
                                            {massageWarning.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-32 sm:ml-8 md:ml-32 lg:ml-60 font-medium text-gray-600 absolute">
                                            الايميل
                                        </p>

                                        <input
                                            placeholder="123@ex.com"
                                            type="email"
                                            className="border placeholder-gray-400 focus:outline-none
        focus:border-black w-80 justify-center p-2 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
        border-gray-300 rounded-md"
                                            name="user_email"
                                            onChange={(event) => handleEmail(event)}
                                        />
                                        <span class="font-medium text-danger">
                                            {massageWarning.user_email}
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-32 sm:ml-8 md:ml-32 lg:ml-60 font-medium text-gray-600 absolute">
                                            رقم الهاتف
                                        </p>

                                        <input
                                            name="phone_number"
                                            // value={user.phone_number}
                                            onChange={(e) => handlePhoneNumber(e)}
                                            className="border placeholder-gray-400 focus:outline-none
        focus:border-black w-80 justify-center p-2 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
        border-gray-300 rounded-md"

                                        />
                                        <span className='text-xs text-red-500'>
                                            {massageWarning.phone_number}
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-32 sm:ml-8 md:ml-32 lg:ml-60 font-medium text-gray-600 absolute">
                                            كلمة المرور
                                        </p>

                                        <input
                                            placeholder="*******"
                                            className="border placeholder-gray-400 focus:outline-none
        focus:border-black w-80 justify-center p-2 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
        border-gray-300 rounded-md"
                                            name="user_password"
                                            onChange={(event) => handlePassword(event)}
                                            type={showPassword ? 'text' : 'user_password'}
                                        />
                                        <span class="font-medium text-danger">
                                            {massageWarning.user_password}
                                        </span>
                                        {/* <img
                                            src={showPassword ? '/Images/eye.png' : '/Images/eyebrow.png'}
                                            alt="Show Password"
                                            onClick={togglePasswordVisibility}
                                            className="eye-icon"
                                        /> */}
                                    </div>
                                    <div className="flex justify-center">
                                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-28 sm:ml-8 md:ml-32 lg:ml-56 font-medium text-gray-600 absolute">

                                            تأكيد  كلمة المرور
                                        </p>
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            className="border placeholder-gray-400 focus:outline-none
        focus:border-black w-80 p-2 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
        border-gray-300 rounded-md"

                                            onChange={(event) => handleConfirmPassword(event)}
                                            name="password-confirm"
                                        />
                                        <span class="font-medium text-danger">
                                            {massageWarning.confirmPassword}
                                        </span>

                                    </div>
                                    <div className="flex justify-center">

                                        <button
                                            className="w-80 inline-block pt-2 pr-5 pb-2
                                             pl-5 text-xl font-medium text-center text-white bg-red-500
                                             rounded-lg transition duration-200 hover:bg-red-600 ease"
                                            type="submit"
                                        >
                                            تسجيل
                                        </button>

                                    </div>
                                    <div className='flex flex-col sm:flex-row justify-around mx-4 sm:mx-4 md:mx-32 lg:mx-32'>
                                        <span className="text-sm mt-2 sm:mt-0 sm:ml-2 hover:text-red-500 cursor-pointer">
                                            نسيت كلمة السر ؟
                                        </span>
                                        <a href="/RegisterForm" className="text-sm mt-2 sm:mt-0">
                                            <span className="hover:text-red-500 cursor-pointer">
                                                إنشاء حساب{' '}
                                            </span>
                                        </a>
                                    </div>


                                </form>
                            </div>
                            <svg
                                viewBox="0 0 91 91"
                                className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
  fill-current"
                            >
                                <g stroke="none" strokewidth={1} fillrule="evenodd">
                                    <g fillrule="nonzero">
                                        <g>
                                            <g>
                                                <circle cx="3.261" cy="3.445" r="2.72" />
                                                <circle cx="15.296" cy="3.445" r="2.719" />
                                                <circle cx="27.333" cy="3.445" r="2.72" />
                                                <circle cx="39.369" cy="3.445" r="2.72" />
                                                <circle cx="51.405" cy="3.445" r="2.72" />
                                                <circle cx="63.441" cy="3.445" r="2.72" />
                                                <circle cx="75.479" cy="3.445" r="2.72" />
                                                <circle cx="87.514" cy="3.445" r="2.719" />
                                            </g>
                                            <g transform="translate(0 12)">
                                                <circle cx="3.261" cy="3.525" r="2.72" />
                                                <circle cx="15.296" cy="3.525" r="2.719" />
                                                <circle cx="27.333" cy="3.525" r="2.72" />
                                                <circle cx="39.369" cy="3.525" r="2.72" />
                                                <circle cx="51.405" cy="3.525" r="2.72" />
                                                <circle cx="63.441" cy="3.525" r="2.72" />
                                                <circle cx="75.479" cy="3.525" r="2.72" />
                                                <circle cx="87.514" cy="3.525" r="2.719" />
                                            </g>
                                            <g transform="translate(0 24)">
                                                <circle cx="3.261" cy="3.605" r="2.72" />
                                                <circle cx="15.296" cy="3.605" r="2.719" />
                                                <circle cx="27.333" cy="3.605" r="2.72" />
                                                <circle cx="39.369" cy="3.605" r="2.72" />
                                                <circle cx="51.405" cy="3.605" r="2.72" />
                                                <circle cx="63.441" cy="3.605" r="2.72" />
                                                <circle cx="75.479" cy="3.605" r="2.72" />
                                                <circle cx="87.514" cy="3.605" r="2.719" />
                                            </g>
                                            <g transform="translate(0 36)">
                                                <circle cx="3.261" cy="3.686" r="2.72" />
                                                <circle cx="15.296" cy="3.686" r="2.719" />
                                                <circle cx="27.333" cy="3.686" r="2.72" />
                                                <circle cx="39.369" cy="3.686" r="2.72" />
                                                <circle cx="51.405" cy="3.686" r="2.72" />
                                                <circle cx="63.441" cy="3.686" r="2.72" />
                                                <circle cx="75.479" cy="3.686" r="2.72" />
                                                <circle cx="87.514" cy="3.686" r="2.719" />
                                            </g>
                                            <g transform="translate(0 49)">
                                                <circle cx="3.261" cy="2.767" r="2.72" />
                                                <circle cx="15.296" cy="2.767" r="2.719" />
                                                <circle cx="27.333" cy="2.767" r="2.72" />
                                                <circle cx="39.369" cy="2.767" r="2.72" />
                                                <circle cx="51.405" cy="2.767" r="2.72" />
                                                <circle cx="63.441" cy="2.767" r="2.72" />
                                                <circle cx="75.479" cy="2.767" r="2.72" />
                                                <circle cx="87.514" cy="2.767" r="2.719" />
                                            </g>
                                            <g transform="translate(0 61)">
                                                <circle cx="3.261" cy="2.846" r="2.72" />
                                                <circle cx="15.296" cy="2.846" r="2.719" />
                                                <circle cx="27.333" cy="2.846" r="2.72" />
                                                <circle cx="39.369" cy="2.846" r="2.72" />
                                                <circle cx="51.405" cy="2.846" r="2.72" />
                                                <circle cx="63.441" cy="2.846" r="2.72" />
                                                <circle cx="75.479" cy="2.846" r="2.72" />
                                                <circle cx="87.514" cy="2.846" r="2.719" />
                                            </g>
                                            <g transform="translate(0 73)">
                                                <circle cx="3.261" cy="2.926" r="2.72" />
                                                <circle cx="15.296" cy="2.926" r="2.719" />
                                                <circle cx="27.333" cy="2.926" r="2.72" />
                                                <circle cx="39.369" cy="2.926" r="2.72" />
                                                <circle cx="51.405" cy="2.926" r="2.72" />
                                                <circle cx="63.441" cy="2.926" r="2.72" />
                                                <circle cx="75.479" cy="2.926" r="2.72" />
                                                <circle cx="87.514" cy="2.926" r="2.719" />
                                            </g>
                                            <g transform="translate(0 85)">
                                                <circle cx="3.261" cy="3.006" r="2.72" />
                                                <circle cx="15.296" cy="3.006" r="2.719" />
                                                <circle cx="27.333" cy="3.006" r="2.72" />
                                                <circle cx="39.369" cy="3.006" r="2.72" />
                                                <circle cx="51.405" cy="3.006" r="2.72" />
                                                <circle cx="63.441" cy="3.006" r="2.72" />
                                                <circle cx="75.479" cy="3.006" r="2.72" />
                                                <circle cx="87.514" cy="3.006" r="2.719" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <svg
                                viewBox="0 0 91 91"
                                className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
  fill-current"
                            >
                                <g stroke="none" strokewidth={1} fillrule="evenodd">
                                    <g fillrule="nonzero">
                                        <g>
                                            <g>
                                                <circle cx="3.261" cy="3.445" r="2.72" />
                                                <circle cx="15.296" cy="3.445" r="2.719" />
                                                <circle cx="27.333" cy="3.445" r="2.72" />
                                                <circle cx="39.369" cy="3.445" r="2.72" />
                                                <circle cx="51.405" cy="3.445" r="2.72" />
                                                <circle cx="63.441" cy="3.445" r="2.72" />
                                                <circle cx="75.479" cy="3.445" r="2.72" />
                                                <circle cx="87.514" cy="3.445" r="2.719" />
                                            </g>
                                            <g transform="translate(0 12)">
                                                <circle cx="3.261" cy="3.525" r="2.72" />
                                                <circle cx="15.296" cy="3.525" r="2.719" />
                                                <circle cx="27.333" cy="3.525" r="2.72" />
                                                <circle cx="39.369" cy="3.525" r="2.72" />
                                                <circle cx="51.405" cy="3.525" r="2.72" />
                                                <circle cx="63.441" cy="3.525" r="2.72" />
                                                <circle cx="75.479" cy="3.525" r="2.72" />
                                                <circle cx="87.514" cy="3.525" r="2.719" />
                                            </g>
                                            <g transform="translate(0 24)">
                                                <circle cx="3.261" cy="3.605" r="2.72" />
                                                <circle cx="15.296" cy="3.605" r="2.719" />
                                                <circle cx="27.333" cy="3.605" r="2.72" />
                                                <circle cx="39.369" cy="3.605" r="2.72" />
                                                <circle cx="51.405" cy="3.605" r="2.72" />
                                                <circle cx="63.441" cy="3.605" r="2.72" />
                                                <circle cx="75.479" cy="3.605" r="2.72" />
                                                <circle cx="87.514" cy="3.605" r="2.719" />
                                            </g>
                                            <g transform="translate(0 36)">
                                                <circle cx="3.261" cy="3.686" r="2.72" />
                                                <circle cx="15.296" cy="3.686" r="2.719" />
                                                <circle cx="27.333" cy="3.686" r="2.72" />
                                                <circle cx="39.369" cy="3.686" r="2.72" />
                                                <circle cx="51.405" cy="3.686" r="2.72" />
                                                <circle cx="63.441" cy="3.686" r="2.72" />
                                                <circle cx="75.479" cy="3.686" r="2.72" />
                                                <circle cx="87.514" cy="3.686" r="2.719" />
                                            </g>
                                            <g transform="translate(0 49)">
                                                <circle cx="3.261" cy="2.767" r="2.72" />
                                                <circle cx="15.296" cy="2.767" r="2.719" />
                                                <circle cx="27.333" cy="2.767" r="2.72" />
                                                <circle cx="39.369" cy="2.767" r="2.72" />
                                                <circle cx="51.405" cy="2.767" r="2.72" />
                                                <circle cx="63.441" cy="2.767" r="2.72" />
                                                <circle cx="75.479" cy="2.767" r="2.72" />
                                                <circle cx="87.514" cy="2.767" r="2.719" />
                                            </g>
                                            <g transform="translate(0 61)">
                                                <circle cx="3.261" cy="2.846" r="2.72" />
                                                <circle cx="15.296" cy="2.846" r="2.719" />
                                                <circle cx="27.333" cy="2.846" r="2.72" />
                                                <circle cx="39.369" cy="2.846" r="2.72" />
                                                <circle cx="51.405" cy="2.846" r="2.72" />
                                                <circle cx="63.441" cy="2.846" r="2.72" />
                                                <circle cx="75.479" cy="2.846" r="2.72" />
                                                <circle cx="87.514" cy="2.846" r="2.719" />
                                            </g>
                                            <g transform="translate(0 73)">
                                                <circle cx="3.261" cy="2.926" r="2.72" />
                                                <circle cx="15.296" cy="2.926" r="2.719" />
                                                <circle cx="27.333" cy="2.926" r="2.72" />
                                                <circle cx="39.369" cy="2.926" r="2.72" />
                                                <circle cx="51.405" cy="2.926" r="2.72" />
                                                <circle cx="63.441" cy="2.926" r="2.72" />
                                                <circle cx="75.479" cy="2.926" r="2.72" />
                                                <circle cx="87.514" cy="2.926" r="2.719" />
                                            </g>
                                            <g transform="translate(0 85)">
                                                <circle cx="3.261" cy="3.006" r="2.72" />
                                                <circle cx="15.296" cy="3.006" r="2.719" />
                                                <circle cx="27.333" cy="3.006" r="2.72" />
                                                <circle cx="39.369" cy="3.006" r="2.72" />
                                                <circle cx="51.405" cy="3.006" r="2.72" />
                                                <circle cx="63.441" cy="3.006" r="2.72" />
                                                <circle cx="75.479" cy="3.006" r="2.72" />
                                                <circle cx="87.514" cy="3.006" r="2.719" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterForm