import React, { useState, useEffect } from 'react'
import axios from 'axios';
import registerFunctions from './RegistrationFunctions'
import { ToastContainer } from 'react-toastify';

const RegisterForm = () => {

    const {
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
        handlePhoneNumber,
        handleConfirmPassword,
        massageWarning
    } = registerFunctions();



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
                                        <div className='flex flex-col'>
                                            <p className="w-full text-2xl mb-5 font-medium text-center leading-snug font-serif">
                                                التحقق
                                            </p>
                                            <p className='w-64 text-sm text-center mx-auto '>
                                                قم بتأكيد بريدك الإلكتروني                                              </p>
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
                                                        لديك حساب بالفعل؟{' '}
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </form>

                                ) : (
                                    <form onSubmit={(e) => handleSubmit(e, console.log("clicked"), userId)} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-2">
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