import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationFunctions = () => {

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
                setUser({ ...user, user_id: res.data.user_id });
                const user_id = res.data.user_id; // Access user_id from the response            
                setUserId(user_id);
                setRegisterRes(res.data);
                setSavedVerificationCode(res.data.verification_code);
                setIsRegistered(true);
            } catch (err) {
                const userFlag = err.response.data.user.flag;
                const user_id = err.response.data.user.user_id;
                if (userFlag === false && err.response.status === 409) {
                    setUserId(user_id);
                    setUserFlag(userFlag);
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
            // console.error("Verification error:", error);
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await axios.put(`http://localhost:5151/Register/reSendCode/${userId}`);
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



    return {
        isRegistered,
        handleVerificationSubmit,
        verificationCode,
        setVerificationCode,
        handleResendCode,
        // message,
        handleSubmit,
        userId,
        handleName,
        handlePassword,
        handleEmail,
        useNavigate,
        handlePhoneNumber,
        handleConfirmPassword,
        massageWarning

    }
}

export default RegistrationFunctions