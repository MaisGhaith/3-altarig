import React, { useEffect } from 'react'
import registerFunctions from './RegistrationFunctions'

const VerificationForm = ({ userId }) => {
    const registrationFunctions = registerFunctions();

    const {
        handleVerificationSubmit,
        verificationCode,
        setVerificationCode,
        handleResendCode,
        message,
        // userId
    } = registrationFunctions;

    return (
        <div>
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
        </div>
    )
}

export default VerificationForm