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

        // <div>
        //     <div class="h-screen md:flex">


        //         <div
        //             class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-900 to-purple-200 i justify-around items-center hidden">
        //             <div>
        //                 <h1 class="text-white font-bold text-4xl font-sans"> تسجيل الدخول    </h1>
        //                 <p class="text-white mt-1">
        //                     إذا كنت تمتلك حسابًا مسبقًا, قم</p>
        //                 <a href="/LoginForm"><span> بتسجيل الدخول</span> </a>
        //                 <a href="/LoginForm">
        //                     <button type="submit" class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">من هنا</button>
        //                 </a>
        //             </div>
        //             <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        //             <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        //             <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        //             <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        //         </div>

        //         <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
        //             <form onSubmit={handleSubmit} class="bg-white">
        //                 <h1 class="text-gray-800 font-bold text-2xl mb-1">اهلا بك</h1>
        //                 <p class="text-sm font-normal text-gray-600 mb-7">التسجيل عن طريق :  </p>

        //                 <div className='flex justify-center gap-3 mb-3'>
        //                     <button className="flex items-center border border-gray-100 rounded-lg shadow-md max-w-xs px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        //                         <svg
        //                             className="h-6 w-6 "
        //                             xmlns="http://www.w3.org/2000/svg"
        //                             xmlnsXlink="http://www.w3.org/1999/xlink"
        //                             viewBox="-0.5 0 48 48"
        //                             version="1.1"
        //                         >
        //                             <g
        //                                 id="Icons"
        //                                 stroke="none"
        //                                 strokeWidth={1}
        //                                 fill="none"
        //                                 fillRule="evenodd"
        //                             >
        //                                 <g id="Color-" transform="translate(-401.000000, -860.000000)">
        //                                     <g id="Google" transform="translate(401.000000, 860.000000)">
        //                                         <path
        //                                             d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
        //                                             id="Fill-1"
        //                                             fill="#FBBC05"
        //                                         >
        //                                             {" "}
        //                                         </path>
        //                                         <path
        //                                             d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
        //                                             id="Fill-2"
        //                                             fill="#EB4335"
        //                                         >
        //                                             {" "}
        //                                         </path>
        //                                         <path
        //                                             d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
        //                                             id="Fill-3"
        //                                             fill="#34A853"
        //                                         >
        //                                             {" "}
        //                                         </path>
        //                                         <path
        //                                             d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
        //                                             id="Fill-4"
        //                                             fill="#4285F4"
        //                                         >
        //                                             {" "}
        //                                         </path>
        //                                     </g>
        //                                 </g>
        //                             </g>
        //                         </svg>
        //                         {/* <span>Continue with Google</span> */}
        //                     </button>

        //                     <button className="flex items-center  border border-gray-100 rounded-lg shadow-md max-w-xs px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        //                         <svg
        //                             className="h-6 w-6 rounded-lg"
        //                             xmlns="http://www.w3.org/2000/svg"
        //                             xmlnsXlink="http://www.w3.org/1999/xlink"
        //                             viewBox="0 0 48 48"
        //                             version="1.1"
        //                         >
        //                             <g
        //                                 id="Icons"
        //                                 stroke="none"
        //                                 strokeWidth={1}
        //                                 fill="none"
        //                                 fillRule="evenodd"
        //                             >
        //                                 <g
        //                                     id="Color-"
        //                                     transform="translate(-200.000000, -160.000000)"
        //                                     fill="#4460A0"
        //                                 >
        //                                     <path
        //                                         d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
        //                                         id="Facebook"
        //                                     ></path>
        //                                 </g>
        //                             </g>
        //                         </svg>
        //                         {/* <span>Continue with Facebook</span> */}
        //                     </button>
        //                 </div>

        //                 <p class="flex justify-center text-sm font-normal text-gray-600 mb-7">أو :  </p>




        //                 <div class="flex items-center border-2 py-1 px-5 rounded-2xl mb-4">
        //                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
        //                         fill="currentColor">
        //                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        //                             clipRule="evenodd" />
        //                     </svg>
        //                     <input class="pl-2 px-5 outline-none border-none" type="text" id=""
        //                         required
        //                         name="user_name"
        //                         // value={user.user_name}
        //                         value={user.user_name}
        //                         onChange={handleChange}

        //                         placeholder="اسم المستخدم" />
        //                 </div>
        //                 <div class="flex items-center border-2 py-1 px-3 rounded-2xl mb-4">
        //                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
        //                         viewBox="0 0 24 24" stroke="currentColor">
        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        //                             d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        //                     </svg>
        //                     <input class="pl-2 outline-none border-none" type="tel" id=""
        //                         required
        //                         name="phone_number"
        //                         value={user.phone_number}
        //                         onChange={handleChange}

        //                         placeholder="رقم الهاتف " />
        //                 </div>
        //                 <div class="flex items-center border-2 py-1 px-3 rounded-2xl mb-4">
        //                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
        //                         viewBox="0 0 24 24" stroke="currentColor">
        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        //                             d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        //                     </svg>
        //                     <input class="pl-2 outline-none border-none" type="text" id=""
        //                         required
        //                         name="user_email"
        //                         value={user.user_email}
        //                         onChange={handleChange}

        //                         placeholder="البريد الإلكتروني" />
        //                 </div>
        //                 <div class="flex items-center border-2 py-1 px-3 rounded-2xl">
        //                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
        //                         fill="currentColor">
        //                         <path fillRule="evenodd"
        //                             d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        //                             clipRule="evenodd" />
        //                     </svg>
        //                     <input class="pl-2 outline-none border-none"
        //                         id=""
        //                         required
        //                         name="user_password"
        //                         value={user.user_password}
        //                         onChange={handleChange}
        //                         placeholder="كلمة المرور"
        //                         type={showPassword ? 'text' : 'password'}
        //                     // placeholder="Enter your password"
        //                     />
        //                     <img
        //                         src={showPassword ? '/Images/eye.png' : '/Images/eyebrow.png'}
        //                         alt="Show Password"
        //                         onClick={togglePasswordVisibility}
        //                         className="eye-icon"
        //                     />
        //                 </div>
        //                 <div class="flex items-center border-2 py-1 px-3 rounded-2xl mt-3">
        //                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
        //                         fill="currentColor">
        //                         <path fillRule="evenodd"
        //                             d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        //                             clipRule="evenodd" />
        //                     </svg>
        //                     <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="تأكيد كلمة المرور " />
        //                 </div>
        //                 <button
        //                     type="submit"
        //                     class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        //                 >تسجيل</button>
        //                 <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">نسيت كلمة السر ؟</span>
        //                 <a href="/LoginForm">
        //                     <span class="text-sm mr-10 hover:text-blue-500 cursor-pointer">لديك حساب بالفعل؟</span>
        //                 </a>
        //             </form>
        //         </div>

        //         <input type="text" address />
        //     </div>


        // </div>

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