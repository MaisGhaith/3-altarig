import React, { useEffect, useState } from 'react'
import LoginFunctions from './LoginFunctions'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import registerFunctions from './RegistrationFunctions'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './ForgetPassword';
const LoginForm = () => {

    // const { isLoggedIn, credentials, handleChange, error } = LoginFunctions();

    const {
        verificationCode,
        setVerificationCode,

    } = registerFunctions();

    const [isVerified, setIsVerified] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [path, setPath] = useState("/Landing");

    const [checkInput, setCheckInput] = useState({
        email: false,
        password: false,
    });

    const [massageWarning, setMassageWarning] = useState({
        email: "",
        password: "",
        submit: "",
    });

    const [userId, setUserId] = useState(null)

    const errorMessages = {
        emailNotVerified: "لم يتم تأكيد بريدك الإلكتروني بعد. سيتم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.",
        accountDeactivated: 'حسابك تم إيقافه بواسطة المسؤول, في حال كنت تعتقد أن هناك خطأ, يرجى التواصل مع الدعم الفني',
        incorrectCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        accountNotFound: 'هذا الحساب غير موجود'
    };
    async function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!checkInput.email && !checkInput.password) {
            setMassageWarning({
                ...massageWarning,
                submit: "Please enter an email and password.",
            });
            return;
        }

        try {
            const res = await axios.post("http://localhost:5151/Login/login", {
                user_email: email,
                user_password: password,
            });

            console.log(res);
            console.log(res.data.user_id);
            setUserId(res.data.user_id);

            localStorage.setItem("email", user.email);
            localStorage.setItem("token", res.data.token);
            navigate(path);
        } catch (err) {
            setUserId(err.response.data.user_id)
            if (err.response) {
                if (err.response.data.message === "Your email is not verified, please verify it") {
                    setMassageWarning({
                        ...massageWarning,
                        submit: errorMessages.emailNotVerified
                    });
                    setIsVerified(true);
                } else if (err.response.data.message === 'your account has been deactivated by admin') {
                    setMassageWarning({
                        ...massageWarning,
                        submit: errorMessages.accountDeactivated
                    });
                } else if (err.response.data.message === "Incorrect email or password") {
                    setMassageWarning({
                        ...massageWarning,
                        submit: errorMessages.incorrectCredentials
                    });
                }

                else if (err.response.status === 404) {
                    setMassageWarning({
                        ...massageWarning,
                        submit: errorMessages.accountNotFound
                    });
                }
            }

            console.error(err);
        }
    }


    function handleEmail(event) {
        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
        const email = event.target.value;

        if (email === "") {
            setMassageWarning({ ...massageWarning, email: "Please enter a value" });
            setCheckInput({ ...checkInput, email: false });
        } else if (!patternEmail.test(email)) {
            setMassageWarning({ ...massageWarning, email: "Please enter a valid email." });
            setCheckInput({ ...checkInput, email: false });
        } else {
            setMassageWarning({ ...massageWarning, email: "" });
            setUser({ ...user, email: email });
            setCheckInput({ ...checkInput, email: true });
        }
    }

    function handlePassword(event) {
        const patternPassword =
            /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        const password = event.target.value;

        if (password === "") {
            setMassageWarning({ ...massageWarning, password: "Please enter a value" });
            setCheckInput({ ...checkInput, password: false });
        } else if (!patternPassword.test(password)) {
            // setMassageWarning({
            //     ...massageWarning,
            //     password: "Password must be at least 8 letters and contain special characters.",
            // });
            // setCheckInput({ ...checkInput, password: false });
        } else {
            setMassageWarning({ ...massageWarning, password: "" });
            setUser({ ...user, password: password });
            setCheckInput({ ...checkInput, password: true });
        }
    }
    console.log(userId)
    const handleVerificationSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!userId) {
                console.error("User ID is missing.");
                return;
            }
            const res = await axios.put(`http://localhost:5151/Login/verify/${userId}`, {
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

    const handleResendCode = async () => {
        try {
            const response = await axios.put(`http://localhost:5151/Login/reSendCode/${userId}`);
            console.log(response.data)
            toast.success(response.data, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error("Error resending verification code:", error);
            toast.error("Unable to resend verification code", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

        }
    };





    return (
        <div>
            <div >
                {/* component */}
                <div className="bg-white relative lg:py-20">
                    <div
                        className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-full xl:px-5 lg:flex-row"
                    >
                        <ToastContainer />
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


                                    {isVerified ? (
                                        <form onSubmit={(event) => handleVerificationSubmit(event)}
                                            className="w-full">
                                            <div className='flex flex-col'>
                                                <p className="w-full text-2xl mb-5 font-medium text-center leading-snug font-serif">
                                                    التحقق
                                                </p>
                                                <p className='w-64 text-sm text-center mx-auto '>
                                                    بريدك الإلكتروني لم يتم تأكيده, سيتم ارسال الرمز الخاص بك الى بريدك</p>
                                            </div>
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

                                                    <a href="/LoginForm" className="text-xs mt-2 sm:mt-0 sm:ml-2">
                                                        <span className="hover:text-red-500 cursor-pointer">
                                                            لديك حساب آخر ؟{' '}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (

                                        <form onSubmit={handleSubmit} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                            <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                                                تسجيل الدخول
                                            </p>
                                            <p className="text-sm font-normal flex justify-center text-gray-600 mb-7">التسجيل عن طريق :  </p>
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
                                                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-32 sm:ml-8 md:ml-32 lg:ml-60 font-medium text-gray-600 absolute">
                                                    الايميل
                                                </p>
                                                <div className='flex flex-col w-80'>
                                                    <input
                                                        placeholder="123@ex.com"
                                                        type="text"
                                                        className="border placeholder-gray-400 focus:outline-none
            focus:border-black  justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
            border-gray-300 rounded-md"
                                                        name="email"
                                                        onChange={(e) => handleEmail(e)}
                                                    />
                                                    <p className="text-red-500 text-center mt-2">
                                                        {massageWarning.email}
                                                    </p>
                                                </div>

                                            </div>
                                            {/* {error && <span className="text-red-500">{error}</span>} */}
                                            <div className="flex justify-center box-border">
                                                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-32 sm:ml-8 md:ml-32 lg:ml-60 font-medium text-gray-600 absolute">
                                                    كلمة المرور
                                                </p>
                                                <div className='flex flex-col w-80'>
                                                    <input
                                                        placeholder="Password"
                                                        type="password"
                                                        className="border placeholder-gray-400 focus:outline-none
            focus:border-black  justify-center p-3 mt-2 mr-0 mb-0 ml-0 text-base  block bg-white
            border-gray-300 rounded-md"
                                                        name="password"

                                                        onChange={(e) => handlePassword(e)}
                                                    />

                                                    <p className="text-red-500 text-center mt-2">
                                                        {massageWarning.password}
                                                    </p>


                                                    <p className="text-red-500 text-center mt-2">
                                                        {massageWarning.submit}
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
                                                    تسجيل دخول
                                                </button>
                                                {/* {massageWarning.submit && (
                                                <p className="text-red-500 text-center mt-2">
                                                    {massageWarning.submit}
                                                </p>
                                            )} */}
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
                                    )}
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
