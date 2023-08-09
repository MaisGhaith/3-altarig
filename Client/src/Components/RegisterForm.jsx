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

    const navigate = useNavigate();
    const path = "/Landing";

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
        phone_number: false,
        user_password: false,
        confirmPassword: false,
    });

    const [massageWarning, setMassageWarning] = useState({
        user_name: "",
        user_email: "",
        phone_number: "",
        user_password: "",
        confirmPassword: "",
        submit: "",
    });

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^07[789]\d{7}$/;
        return phoneNumberPattern.test(phoneNumber);
    }

    const handleName = (event) => {
        const username = event.target.value.trim();
        // const validUsernamePattern = /^[A-Za-z\s]{8,}$/;
        const validUsernamePattern = /^[\p{L}A-Za-z_\s]{8,}$/u;

        setCheckInput({ ...checkInput, user_name: validUsernamePattern.test(username) });

        if (!username) {
            setMassageWarning({
                ...massageWarning,
                user_name: "يجب إدخال اسم مستخدم ",
            });
        } else if (!validUsernamePattern.test(username)) {
            setMassageWarning({
                ...massageWarning,
                user_name: " اسم المستخدم يجب ان يحتوي على 8 احرف وبدون رموز خاصة               ",
            });
        } else {
            setMassageWarning({ ...massageWarning, user_name: "" });
            setUser({ ...user, user_name: username });
        }
    }

    const handleEmail = (event) => {
        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
        const user_email = event.target.value;

        setCheckInput({ ...checkInput, user_email: patternEmail.test(user_email) });

        if (!user_email) {
            setMassageWarning({ ...massageWarning, user_email: "يرجى ادخال ايميل " });
        } else if (!patternEmail.test(user_email)) {
            setMassageWarning({
                ...massageWarning,
                user_email: " ادخل ايميل",
            });
        } else {
            setMassageWarning({ ...massageWarning, user_email: "" });
            setUser({ ...user, user_email: user_email });
        }
    }

    const handlePhoneNumber = (event) => {
        const phoneNumber = event.target.value;

        setCheckInput({ ...checkInput, phone_number: isValidPhoneNumber(phoneNumber) });

        if (!phoneNumber) {
            setMassageWarning({
                ...massageWarning,
                phone_number: " ادخل رقم هاتف",
            });
        } else if (!isValidPhoneNumber(phoneNumber)) {
            setMassageWarning({
                ...massageWarning,
                phone_number: "يرجى ادخال رقم هاتف صحيح",
            });
        } else {
            setMassageWarning({ ...massageWarning, phone_number: "" });
            setUser({ ...user, phone_number: phoneNumber });
        }
    }

    const handlePassword = (event) => {
        const patternPassword =
            /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        const password = event.target.value;

        setCheckInput({ ...checkInput, user_password: patternPassword.test(password) });

        if (!password) {
            setMassageWarning({
                ...massageWarning,
                user_password: "ادخل كلمة مرور",
            });
        } else if (!patternPassword.test(password)) {
            setMassageWarning({
                ...massageWarning,
                // user_password: `Password must contain 8 charachter, inclueds upperCase, lowerCase, number, special symbol `,
                user_password: `يجب أن تحتوي كلمة المرور على 8 أحرف، بما في ذلك حرف كبير وحرف صغير ورقم ورمز خاص`,

            });
        } else {
            setMassageWarning({ ...massageWarning, user_password: "" });
            setUser({ ...user, user_password: password });
        }
    }

    const handleConfirmPassword = (event) => {
        const confirmPassword = event.target.value;
        const password = user.user_password;

        setCheckInput({ ...checkInput, confirmPassword: confirmPassword === password });

        if (!confirmPassword) {
            setMassageWarning({
                ...massageWarning,
                confirmPassword: "قم بتأكيد كلمة المرور",
            });
        } else if (confirmPassword !== password) {
            setMassageWarning({
                ...massageWarning,
                confirmPassword: "كلمة المرور غير متطابقة",
            });
        } else {
            setMassageWarning({ ...massageWarning, confirmPassword: "" });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid =
            checkInput.user_name &&
            checkInput.user_email &&
            checkInput.phone_number &&
            checkInput.user_password &&
            checkInput.confirmPassword;

        if (isValid) {
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
        } else {
            setMassageWarning({
                ...massageWarning,
                submit: "Please enter all required fields.",
            });
        }
    }

    return (

        <div>
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
                                <form onSubmit={(e) => handleSubmit(e, console.log("clicked"))} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-2">
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
                                    <div className="flex justify-center box-border">
                                        <div className='flex flex-col w-80'>
                                            <input
                                                placeholder="اسم المستخدم"
                                                type="text"
                                                className="border placeholder-gray-400 focus:outline-none
            focus:border-black  justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
            border-gray-300 rounded-md"
                                                id='username'
                                                name="user_name"

                                                onChange={(event) => handleName(event)}
                                            />
                                            <p className="text-md text-red-500">
                                                {massageWarning.user_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center box-border">
                                        <div className='flex flex-col w-80'>
                                            <input
                                                placeholder="email@ex.com"
                                                type="email"
                                                className="border placeholder-gray-400 focus:outline-none
                                                focus:border-black  justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
                                                border-gray-300 rounded-md"
                                                name="user_email"
                                                id='user_email'
                                                onChange={(event) => handleEmail(event)}
                                            />
                                            <p className="text-md text-red-500">
                                                {massageWarning.user_email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center box-border">
                                        <div className='flex flex-col w-80'>
                                            <input
                                                placeholder=" 0000000 07$"
                                                type="phone_number"
                                                className="border placeholder-gray-400 focus:outline-none
            focus:border-black  justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
            border-gray-300 rounded-md"
                                                name="phone_number"

                                                onChange={(e) => handlePhoneNumber(e)}
                                            />
                                            <p className="text-md text-red-500">
                                                {massageWarning.phone_number}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center box-border">
                                        <div className='flex flex-col w-80'>
                                            <input
                                                placeholder="*******"
                                                type="password"
                                                className="border placeholder-gray-400 focus:outline-none
            focus:border-black  justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
            border-gray-300 rounded-md"
                                                name="user_password"

                                                onChange={(event) => handlePassword(event)}
                                            />
                                            <p className="text-sm text-red-500">
                                                {massageWarning.user_password}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center box-border">
                                        <div className='flex flex-col w-80'>
                                            <input
                                                placeholder="*******"
                                                type="password"
                                                className="border placeholder-gray-400 focus:outline-none
            focus:border-black  justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
            border-gray-300 rounded-md"
                                                name="password-confirm"

                                                onChange={(event) => handleConfirmPassword(event)}
                                            />
                                            <p className="text-md text-red-500">
                                                {massageWarning.confirmPassword}
                                            </p>
                                        </div>
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