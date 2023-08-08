import React, { useEffect, useState } from 'react'
import LoginFunctions from './LoginFunctions'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {

    // const { isLoggedIn, credentials, handleChange, error } = LoginFunctions();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [path, setPath] = useState("/Landing");

    const [passwordMode, setPasswordMode] = useState(true);

    function handlePasswordMode() {
        setPasswordMode(!passwordMode);
    }

    const themeValue = {
        success: "green",
        error: "red",
        warning: "red",
        normal: "teal",
    };

    const [checkInput, setCheckInput] = useState({
        email: false,
        password: false,
        type: false,
    });

    const [inputTheme, setInputTheme] = useState({
        email: themeValue.normal,
        password: themeValue.normal,
    });

    const [massageWarning, setMassageWarning] = useState({
        email: "",
        password: "",
    });

    function handleEmail(event) {
        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
        const email = event.target.value;
        setCheckInput({ ...checkInput, email: false });
        if (email === "") {
            setInputTheme({ ...inputTheme, email: themeValue.normal });
            setMassageWarning({ ...massageWarning, email: "Please enter a value" });
        } else if (!patternEmail.test(email)) {
            setInputTheme({ ...inputTheme, email: themeValue.error });
            setMassageWarning({
                ...massageWarning,
                email: "Please enter a valid email.",
            });
        } else {
            setMassageWarning({ ...massageWarning, email: "" });
            setInputTheme({ ...inputTheme, email: themeValue.success });
            setUser({ ...user, email: email });
            setCheckInput({ ...checkInput, email: true });
        }
    }

    function handlePassword(event) {
        const patternPassword =
            /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        const password = event.target.value;
        setCheckInput({ ...checkInput, password: false });
        if (password === "") {
            setInputTheme({ ...inputTheme, password: themeValue.normal });
            setMassageWarning({
                ...massageWarning,
                password: "Please enter a value",
            });
        } else if (!patternPassword.test(password)) {
            setInputTheme({ ...inputTheme, password: themeValue.error });
            setMassageWarning({
                ...massageWarning,
                password: `Please enter a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, one number, and one special character `,
            });
        } else {
            setMassageWarning({ ...massageWarning, password: "" });
            setInputTheme({ ...inputTheme, password: themeValue.success });
            setUser({ ...user, password: password });
            setCheckInput({ ...checkInput, password: true });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!checkInput.email && !checkInput.password) {
            setMassageWarning({
                ...massageWarning,
                submit: "Please enter an email",
            });
            return;
        }

        try {
            const res = await axios.post("http://localhost:5151/Login/login", {
                user_email: email,
                user_password: password,
            });

            localStorage.setItem("email", user.email);
            localStorage.setItem("token", res.data.token);
            navigate(path);
        } catch (err) {
            if (err.response && err.response.data === "Don't have access") {
                setMassageWarning({
                    ...massageWarning,
                    submit:
                        "Your account has not been approved by the admin yet. You will receive an email when your account is approved or rejected.",
                });
            } else {
                setMassageWarning({
                    ...massageWarning,
                    submit: "The email or password is invalid.",
                });
            }
            console.error(err);
        }
    }

    return (
        <div>
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
                                        تسجيل الدخول
                                    </p>
                                    <form onSubmit={handleSubmit} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                        <p class="text-sm font-normal flex justify-center text-gray-600 mb-7">التسجيل عن طريق :  </p>
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
                                        <div className="relative">
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-32 sm:ml-8 md:ml-32 lg:ml-60 font-medium text-gray-600 absolute">
                                                الايميل
                                            </p>

                                            <input
                                                placeholder="123@ex.com"
                                                type="text"
                                                className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-80 justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
            border-gray-300 rounded-md"
                                                name="email"
                                                // value={credentials.user_email}
                                                onChange={(e) => handleEmail(e)}
                                            />
                                            <span className="text-danger">
                                                {massageWarning.email}
                                            </span>
                                        </div>
                                        {/* {error && <span className="text-red-500">{error}</span>} */}
                                        <div className="flex justify-center">
                                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-28 sm:ml-8 md:ml-32 lg:ml-56 font-medium text-gray-600 absolute">

                                                كلمة المرور
                                            </p>
                                            <input
                                                placeholder="Password"
                                                type="password"
                                                className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-80 p-3 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                                                name="password"
                                                // value={credentials.user_password}
                                                onChange={(e) => handlePassword(e)}
                                            />

                                            <span className="text-danger">
                                                {massageWarning.password}
                                            </span>
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                className="w-80 inline-block pt-2 pr-5 pb-2
                                                 pl-5 text-xl font-medium text-center text-white bg-red-500
            rounded-lg transition duration-200 hover:bg-red-600 ease"
                                                type="submit"
                                            >
                                                تسجيل دخول
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LoginForm;
