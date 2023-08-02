import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

import registerFunctions from './RegistrationFunctions'
const RegisterForm = () => {

    const {
        handleChange,
        handleSubmit,
        user }
        = registerFunctions();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div>
                <div class="h-screen md:flex">


                    <div
                        class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-900 to-purple-200 i justify-around items-center hidden">
                        <div>
                            <h1 class="text-white font-bold text-4xl font-sans"> تسجيل الدخول    </h1>
                            <p class="text-white mt-1">
                                إذا كنت تمتلك حسابًا مسبقًا, قم</p>
                            <a href="/LoginForm"><span> بتسجيل الدخول</span> </a>
                            <a href="/LoginForm">
                                <button type="submit" class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">من هنا</button>
                            </a>
                        </div>
                        <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                        <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                        <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                        <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    </div>

                    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
                        <form onSubmit={handleSubmit} class="bg-white">
                            <h1 class="text-gray-800 font-bold text-2xl mb-1">اهلا بك</h1>
                            <p class="text-sm font-normal text-gray-600 mb-7">التسجيل عن طريق :  </p>

                            <div className='flex justify-center gap-3 mb-3'>
                                <button className="flex items-center border border-gray-100 rounded-lg shadow-md max-w-xs px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <svg
                                        className="h-6 w-6 "
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="-0.5 0 48 48"
                                        version="1.1"
                                    >
                                        <g
                                            id="Icons"
                                            stroke="none"
                                            strokeWidth={1}
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                                <g id="Google" transform="translate(401.000000, 860.000000)">
                                                    <path
                                                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                        id="Fill-1"
                                                        fill="#FBBC05"
                                                    >
                                                        {" "}
                                                    </path>
                                                    <path
                                                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                        id="Fill-2"
                                                        fill="#EB4335"
                                                    >
                                                        {" "}
                                                    </path>
                                                    <path
                                                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                        id="Fill-3"
                                                        fill="#34A853"
                                                    >
                                                        {" "}
                                                    </path>
                                                    <path
                                                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                        id="Fill-4"
                                                        fill="#4285F4"
                                                    >
                                                        {" "}
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    {/* <span>Continue with Google</span> */}
                                </button>

                                <button className="flex items-center  border border-gray-100 rounded-lg shadow-md max-w-xs px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <svg
                                        className="h-6 w-6 rounded-lg"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 48 48"
                                        version="1.1"
                                    >
                                        <g
                                            id="Icons"
                                            stroke="none"
                                            strokeWidth={1}
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g
                                                id="Color-"
                                                transform="translate(-200.000000, -160.000000)"
                                                fill="#4460A0"
                                            >
                                                <path
                                                    d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                                                    id="Facebook"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    {/* <span>Continue with Facebook</span> */}
                                </button>
                            </div>

                            <p class="flex justify-center text-sm font-normal text-gray-600 mb-7">أو :  </p>




                            <div class="flex items-center border-2 py-1 px-5 rounded-2xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd" />
                                </svg>
                                <input class="pl-2 px-5 outline-none border-none" type="text" id=""
                                    required
                                    name="user_name"
                                    // value={user.user_name}
                                    value={user.user_name}
                                    onChange={handleChange}

                                    placeholder="اسم المستخدم" />
                            </div>
                            <div class="flex items-center border-2 py-1 px-3 rounded-2xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                                <input class="pl-2 outline-none border-none" type="tel" id=""
                                    required
                                    name="phone_number"
                                    value={user.phone_number}
                                    onChange={handleChange}

                                    placeholder="رقم الهاتف " />
                            </div>
                            <div class="flex items-center border-2 py-1 px-3 rounded-2xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input class="pl-2 outline-none border-none" type="text" id=""
                                    required
                                    name="user_email"
                                    value={user.user_email}
                                    onChange={handleChange}

                                    placeholder="البريد الإلكتروني" />
                            </div>
                            <div class="flex items-center border-2 py-1 px-3 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd" />
                                </svg>
                                <input class="pl-2 outline-none border-none"
                                    id=""
                                    required
                                    name="user_password"
                                    value={user.user_password}
                                    onChange={handleChange}
                                    placeholder="كلمة المرور"
                                    type={showPassword ? 'text' : 'password'}
                                // placeholder="Enter your password"
                                />
                                <img
                                    src={showPassword ? '/Images/eye.png' : '/Images/eyebrow.png'}
                                    alt="Show Password"
                                    onClick={togglePasswordVisibility}
                                    className="eye-icon"
                                />
                            </div>
                            <div class="flex items-center border-2 py-1 px-3 rounded-2xl mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd" />
                                </svg>
                                <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="تأكيد كلمة المرور " />
                            </div>
                            <button
                                type="submit"
                                class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                            >تسجيل</button>
                            <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">نسيت كلمة السر ؟</span>
                            <a href="/LoginForm">
                                <span class="text-sm mr-10 hover:text-blue-500 cursor-pointer">لديك حساب بالفعل؟</span>
                            </a>
                        </form>
                    </div>

                    <input type="text" address />
                </div>


            </div>
        </div>
    )
}

export default RegisterForm