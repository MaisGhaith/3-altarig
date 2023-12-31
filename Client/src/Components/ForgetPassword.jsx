import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordp, setpasswordp] = useState("");
    const [reset, setReset] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkMessage, setCheckMessage] = useState(false);
    const [pinCode, setPinCode] = useState("");

    const [loading, setLoading] = useState(false);

    const handleFind = async () => {
        console.log(email);
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5151/Login/sendPassCode",
                {
                    user_email: email,
                }
            );
            setReset(true);
            setErrorMessage(""); // Reset any previous error message
        } catch (error) {
            setErrorMessage("ايميل خاطئ", error.response.status); // Set the error message from the response
            setReset(false);
        } finally {
            setLoading(false);
        }
    };


    const handleResetPassword = async () => {
        try {
            const response = await axios.post("http://localhost:5151/Login/updatePass", {
                user_email: email,
                reset_pin: pinCode,
            });

            console.log(response.data.message);
            setErrorMessage("");
            setCheckMessage(true);
        } catch (error) {
            console.log(error.message)
            console.error("Error resetting password:", error.message);
            setErrorMessage(error.message, "5555555555555555555555555555555555");
        }
    };


    const handleResetPasswordNow = async () => {
        console.log(email)
        console.log(password)
        if (validatePassword(password)) {

            try {
                const response = await axios.put(
                    "http://localhost:5151/Login/resetPassword",
                    {
                        user_email: email,
                        user_password: password,
                    }
                );
                window.location.href = "http://localhost:3000/Landing";
            } catch (error) {
                console.log(error)
                console.error("Error resetting password:", error.message);
                setErrorMessage("error resetting password");
            }
        }
    };

    function validatePassword(userPassword) {
        let password = userPassword;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setpasswordp("! Password must contain at least 8 characters, 1 number, 1 uppercase letter, and 1 special character")
            return false;
        } else {
            setpasswordp("")
            return true;
        }
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-xs mt-10">

                {checkMessage ? (
                    <>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-lg flex justify-center mb-4"> ادخل كلمة المرور الجديدة</p>
                            <input type="text"
                                className="input input-error input-bordered w-56 max-w-xs"
                                disabled
                                readOnly
                                value={email} />
                        </div>
                        <div className="my-4 flex justify-center">
                            <input
                                className="shadow cursor-pointer items-center appearance-none border rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="كلمة المرور الجديدة"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="text-red-500">{passwordp}</p>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="flex justify-center">
                                <button
                                    className="bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 w-56 h-10 mb-6 text-white  focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleResetPasswordNow}
                                >
                                    Reset Now
                                </button>
                            </div>
                        </div>
                        {errorMessage && <p className="text-red-500" >{errorMessage}</p>}
                    </>
                ) : (
                    <>
                        <p className="flex font-bold text-sm justify-center">ادخل بريدك الإلكتروني</p>
                        <div className="my-4 flex justify-center">
                            <input
                                className="shadow items-center appearance-none border rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Email"
                                type="text"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {reset ? (
                            <>
                                <div className="mb-6 ">
                                    <label
                                        className=" flex text-gray-700 justify-center text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        رمز التأكيد{" "}
                                    </label>
                                    <div className=" flex justify-center">
                                        <input
                                            className="shadow items-center appearance-none border rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="text"
                                            placeholder="123456"
                                            value={pinCode}
                                            onChange={(e) => setPinCode(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex justify-center">
                                        <button
                                            className="bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 w-56 h-10 mb-6 text-white  focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={handleResetPassword}
                                        >
                                            استمر
                                        </button>
                                    </div>
                                    {errorMessage && <p className=" flex justify-center text-red-500">{errorMessage}</p>}
                                </div>
                            </>
                        ) : null}
                        <div className="flex items-center justify-center">
                            {reset ? null : (
                                <>
                                    {loading ? (
                                        <>
                                            <button
                                                disabled=""
                                                type="button"
                                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800 inline-flex items-center"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="status"
                                                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                Loading...
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col">
                                            <button
                                                className="bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 w-24 h-10 mb-6 text-white  focus:outline-none focus:shadow-outline"
                                                type="button"
                                                onClick={handleFind}
                                            >
                                                تأكيد
                                            </button>

                                            {errorMessage && <p className=" flex justify-center text-red-500">{errorMessage}</p>}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;