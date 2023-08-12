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
        user_id: '',
        user_name: '',
        user_email: '',
        user_password: '',
        phone_number: '',
        role: 'user',
        deleted: false,
        verification_code: ''
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


    const [registerRes, setRegisterRes] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [savedVerificationCode, setSavedVerificationCode] = useState('');
    const [userId, setUserId] = useState(null);
    const [userFlag, setUserFlag] = useState(null);
    console.log(userFlag)
    console.log(userId)

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
                console.log(res.data.user_id);
                setUser({ ...user, user_id: res.data.user_id });
                const user_id = res.data.user_id; // Access user_id from the response
                setUserId(user_id);
                setRegisterRes(res.data);
                setSavedVerificationCode(res.data.verification_code);
                setIsRegistered(true);
            } catch (err) {
                const userFlag = err.response.data.user.flag;
                if (userFlag === false && err.response.status === 409) {

                    setUserFlag(userFlag);
                    console.log("flag false ")
                    setRegisterRes(null);
                    setIsRegistered(true);
                } else if (err.response.status === 409) {

                    setMassageWarning({
                        ...massageWarning,
                        user_email: "The email address already exists, try to login.",
                    });
                    console.log(err.response)
                    console.error(err);
                }
                else {
                    console.error("An error occurred:", err);
                }
            }

        } else {
            setMassageWarning({
                ...massageWarning,
                submit: "Please enter all required fields.",
            });
        }
    };
    console.log(userId)
    const handleVerificationSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!userId) {
                console.error("User ID is missing.");
                return;
            }
            const res = await axios.put(`http://localhost:5151/Register/verify/${userId}`, {
                verification_code: verificationCode,
            });
            console.log("Verification successful:", res.data);
            localStorage.setItem("username", res.data.user_name);
            localStorage.setItem("email", res.data.user_email);
            localStorage.setItem("token", res.data.token);
            navigate(path);
        } catch (error) {
            console.error("Verification error:", error);
        }
    };


    const [message, setMessage] = useState('');
    const handleResendCode = async () => {
        try {
            const response = await axios.put(`http://localhost:5151/Register/reSendCode/${userId}`);
            setMessage(response.data); // Assuming the response is a success message
        } catch (error) {
            console.error("Error resending verification code:", error);
            setMessage("Unable to resend verification code");
        }
    };

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
                                mt-16 sm:mt-16 md:mt-12 lg:mt-6
  relative z-10 "
                            >

                                {isRegistered ? (
                                    <form onSubmit={(event) => handleVerificationSubmit(event)}
                                        className="w-full">
                                        <p className="w-full text-2xl mb-5 font-medium text-center leading-snug font-serif">
                                            التحقق
                                        </p>
                                        <div className="flex flex-col items-center"> {/* Add this wrapping div */}
                                            <div className="flex justify-center mb-5">
                                                <input
                                                    placeholder="ادخل رمز التأكيد"
                                                    type="text"
                                                    className="border placeholder-gray-400 focus:outline-none focus:border-black p-2 mt-2 text-base block bg-white border-gray-300 rounded-md"
                                                    value={verificationCode}
                                                    onChange={(event) => setVerificationCode(event.target.value)}
                                                />
                                            </div>
                                            {/* Display any warning messages for the verification code here */}
                                            {/* ... */}
                                            <div className="flex justify-center">
                                                <button
                                                    className="w-44 inline-block p-2 text-xl font-medium text-center text-white bg-[#BE123a] rounded-lg transition duration-200 hover:bg-red-600 ease"
                                                    type="submit"
                                                >
                                                    تحقق
                                                </button>
                                            </div>
                                            <div className="flex flex-col sm:flex-col sm:justify-center justify-center my-4 mx-4 sm:mx-4 md:mx-32 lg:mx-32">
                                                <button
                                                    onClick={handleResendCode}
                                                    className="text-xs mt-2 sm:mt-0 sm:ml-2 py-3 hover:text-red-500 cursor-pointer">
                                                    إعادة إرسال الرمز
                                                </button>
                                                {message}
                                                <a href="/LoginForm" className="text-xs mt-2 sm:mt-0 sm:ml-2">
                                                    <span className="hover:text-red-500 cursor-pointer">
                                                        لديك حساب بالفعل؟{' '}
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </form>

                                ) : (
                                    <form onSubmit={(e) => handleSubmit(e, console.log("clicked"), userId)} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-2">
                                        {/* <p class="text-sm font-normal flex justify-center text-gray-600 mb-7">التسجيل عن طريق :  </p> */}
                                        <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                                            التسجيل
                                        </p>
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
                                                className="w-80 inline-block my-5  pt-2 pr-5 pb-2
                                             pl-5 text-xl font-medium text-center text-white bg-red-500
                                             rounded-lg transition duration-200 hover:bg-red-600 ease"
                                                type="submit"
                                            >
                                                تسجيل
                                            </button>
                                        </div>
                                        <div className='flex flex-col sm:flex-row justify-around mx-4 sm:mx-4 md:mx-32 lg:mx-32'>
                                            {/* <span className="text-sm mt-2 sm:mt-0 sm:ml-2 hover:text-red-500 cursor-pointer">
                                            نسيت كلمة السر ؟
                                        </span> */}
                                            <a href="/LoginForm" className="text-sm mt-2 sm:mt-0">
                                                <span className="hover:text-red-500 cursor-pointer">
                                                    لديك حساب بالفعل ؟{' '}
                                                </span>
                                            </a>
                                        </div>
                                    </form>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm