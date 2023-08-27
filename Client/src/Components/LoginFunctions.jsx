import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { useGoogleLogin } from "@react-oauth/google";
import registerFunctions from './RegistrationFunctions'
import { toast } from 'react-toastify';

const LoginFunctions = () => {

    const isLoggedIn = () => {
        // Check if the token exists in local storage
        const token = localStorage.getItem('token');
        return token ? true : false;
    };


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            // setUserGoogle(codeResponse)

            getGoogleLogin(codeResponse);
        },
        onError: (error) => console.log("Login Failed:", error),
    });


    const getGoogleLogin = async (userGoogle) => {
        if (userGoogle.length !== 0) {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userGoogle.access_token}`,
                            Accept: "application/json",
                        },
                    }
                );

                console.log(response.data)
                try {
                    const newUserResponse = await axios.post(
                        `http://localhost:5151/Register/register-google`,
                        response.data
                    );
                    localStorage.setItem("token", newUserResponse.data.token);
                    window.location.href = `/Landing`;
                } catch (err) {
                    console.log(err);
                    // setpasswordp(err.response.data.message);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    };
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
            // navigate(path);
            window.location.href = '/Landing'
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
        } else {
            setMassageWarning({ ...massageWarning, password: "" });
            setUser({ ...user, password: password });
            setCheckInput({ ...checkInput, password: true });
        }
    }
    const handleVerificationSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!userId) {
                console.error("User ID is missing.");
                return;
            }
            const res = await axios.put(`http://localhost:5151/Login/verify/${userId}`, {
                verification_code: verificationCode,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("Verification successful:", res.data);
            localStorage.setItem("username", res.data.user_name);
            localStorage.setItem("email", res.data.user_email);
            localStorage.setItem("token", res.data.token);
            window.location.href = '/Landing'
        } catch (error) {
            console.error("Verification error:", error.message);
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



    const [isForgetPasswordVisible, setIsForgetPasswordVisible] = useState(false);

    const handleForgetPasswordClick = () => {
        setIsForgetPasswordVisible(true);
    };

    const handleReturnToLoginClick = () => {
        setIsForgetPasswordVisible(false);
    };

    return {
        isLoggedIn,
        isVerified,
        handleVerificationSubmit,
        verificationCode,
        setVerificationCode,
        handleResendCode,
        handleSubmit,
        login,
        handleEmail,
        massageWarning,
        handlePassword,
        massageWarning,
        handleReturnToLoginClick

    };
};

export default LoginFunctions;
