import { Input } from "@material-tailwind/react";
import React, { useState } from "react";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const validateForm = () => {
        let isValid = true;

        if (!validateName()) {
            setNameError(true);
            isValid = false;
        }

        if (!validateEmail()) {
            setEmailError(true);
            isValid = false;
        }

        if (!validatePhoneNumber()) {
            setPhoneNumberError(true);
            isValid = false;
        }

        if (!validatePassword()) {
            setPasswordError(true);
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid, perform submit action
            console.log("Form submitted");
        }
    };

    const handleCloseModal = () => {
        // Logic to close the modal goes here
        console.log("Modal closed");
    };

    const validateName = () => {
        const namePattern = /^[\u0600-\u06FF\sA-Za-z]{6,20}$/;
        return namePattern.test(name);
    };

    const validateEmail = () => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailPattern.test(email);
    };

    const validatePhoneNumber = () => {
        const phoneNumberPattern = /^07[789]\d{7}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    const validatePassword = () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,20}$/;
        return passwordPattern.test(password);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(false);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        setPhoneNumberError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(false);
    };

    return (
        <div>

            <>
                <link
                    rel="stylesheet"
                    href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
                />
                <link
                    rel="stylesheet"
                    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
                />
                <main className="profile-page">
                    <section className="relative block h-500-px">
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage: 'url("/Images/profile.jpg")'
                            }}
                        >
                            <span
                                id="blackOverlay"
                                className="w-full h-full absolute opacity-50 bg-black"
                            />
                        </div>

                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                            style={{ transform: "translateZ(0px)" }}
                        >
                            <svg
                                className="absolute bottom-0 overflow-hidden"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x={0}
                                y={0}
                            >
                                <polygon
                                    className="text-blueGray-200 fill-current"
                                    points="2560 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-end">

                                    </div>
                                    <div className="text-center mt-12">

                                        <button onClick={() => window.my_modal_1.showModal()}
                                            className="btn flex p-2.5 bg-green-400 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">  تعديل
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <dialog id="my_modal_1" className="modal">
                                            <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                                                <h3 className="font-bold text-lg">Hello!</h3>
                                                <div className="modal-action flex justify-center">
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div className="flex flex-col gap-6">
                                                            <input
                                                                value={name}
                                                                onChange={handleNameChange}
                                                                className={nameError ? "border-red-500" : "block mb-2 text-sm font-medium border-slate-900 text-gray-900 dark:text-white"}
                                                                placeholder="تعديل الإسم"
                                                            />
                                                            {nameError && <p className="error text-red-400">Please enter a valid name</p>}

                                                            <input
                                                                value={email}
                                                                onChange={handleEmailChange}
                                                                className={emailError ? "border-red-500" : "block mb-2 text-sm font-medium border-slate-400 text-gray-900 dark:text-white"}
                                                                placeholder="تعديل الإيميل"
                                                            />
                                                            {emailError && <p className="error text-red-400">Please enter a valid email address</p>}

                                                            <input
                                                                value={phoneNumber}
                                                                onChange={handlePhoneNumberChange}
                                                                className={phoneNumberError ? "border-red-500" : "block mb-2 text-sm font-medium border-slate-900 text-gray-900 dark:text-white"}
                                                                placeholder="تعديل رقم الهاتف"
                                                            />
                                                            {phoneNumberError && <p className="error text-red-400">Please enter a valid phone number</p>}

                                                            {/* <input
                                                                value={password}
                                                                onChange={handlePasswordChange}
                                                                className={passwordError ? "border-red-500" : ""}
                                                                placeholder="تعديل كلمة المرور"
                                                            />
                                                            {passwordError && (
                                                                <p className="error text-red-400">
                                                                    Please enter a valid password. It should contain at least one capital letter, one symbol, one small letter, and be 6 to 20 characters long.
                                                                </p>
                                                            )} */}
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <button type="submit" className="btn mx-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                                                تأكيد
                                                            </button>
                                                            <button type="button" className="btn mx-5" onClick={handleCloseModal}>
                                                                إلغاء
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </dialog>


                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            Mais Ghaith
                                        </h3>

                                        <div className="mb-2 text-blueGray-600 mt-10">
                                            <i className="fas fa-solid fa-at mx-2 text-lg text-blueGray-400" />
                                            mais.ghaith972000@gmail.com
                                        </div>
                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-light fa-lock mx-2 text-lg text-blueGray-400" />
                                            ***********
                                        </div>
                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-phone-alt mx-2 text-lg text-blueGray-400" />
                                            0790012079
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <div className='text-xl'>
                                                    <h2>طلباتي الحالية</h2>
                                                </div>
                                                {/* component */}

                                                <div className="flex flex-wrap mt-10 justify-center">
                                                    <div className="max-w-xs m-5">
                                                        <div className="bg-gray-100 shadow-xl rounded-lg py-3">
                                                            <div className="p-2">
                                                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                                                    نوع الخدمة
                                                                </h3>
                                                                {/* <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Web Developer</p>
                </div> */}
                                                                <table className="text-xs my-3">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                الموقع
                                                                            </td>
                                                                            <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">رقم الهاتف </td>
                                                                            <td className="px-2 py-2">+977 9955221114</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">التاريخ</td>
                                                                            <td className="px-2 py-2">9-7-2023</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">المبلغ</td>
                                                                            <td className="px-2 py-2">50 JD</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="text-center my-3">
                                                                    {/* <button className="m-2 text-yellow-500 hover:scale-105 hover:text-black font-medium" href="#">
                                                                        تعديل
                                                                    </button> */}
                                                                    <button className="m-2 text-red-500 hover:scale-105 hover:text-black font-medium" href="#">
                                                                        حذف
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="max-w-xs m-5">
                                                        <div className="bg-gray-100 shadow-xl rounded-lg py-3">
                                                            <div className="p-2">
                                                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                                                    نوع الخدمة
                                                                </h3>
                                                                {/* <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Web Developer</p>
                </div> */}
                                                                <table className="text-xs my-3">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                الموقع
                                                                            </td>
                                                                            <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">رقم الهاتف </td>
                                                                            <td className="px-2 py-2">+977 9955221114</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">التاريخ</td>
                                                                            <td className="px-2 py-2">9-7-2023</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">المبلغ</td>
                                                                            <td className="px-2 py-2">50 JD</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="text-center my-3">
                                                                    {/* <button className="m-2 text-yellow-500 hover:scale-105 hover:text-black font-medium" href="#">
                                                                        تعديل
                                                                    </button> */}
                                                                    <button className="m-2 text-red-500 hover:scale-105 hover:text-black font-medium" href="#">
                                                                        حذف
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <div className='text-xl'>
                                                    <h2>طلباتي السابقة</h2>
                                                </div>

                                                {/* component */}

                                                <div className="flex flex-wrap mt-10 justify-center">
                                                    <div className="max-w-xs m-5">
                                                        <div className="bg-gray-100 shadow-xl rounded-lg py-3">
                                                            <div className="p-2">
                                                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                                                    نوع الخدمة
                                                                </h3>
                                                                {/* <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Web Developer</p>
                </div> */}
                                                                <table className="text-xs my-3">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                الموقع
                                                                            </td>
                                                                            <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">رقم الهاتف </td>
                                                                            <td className="px-2 py-2">+977 9955221114</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">التاريخ</td>
                                                                            <td className="px-2 py-2">9-7-2023</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">المبلغ</td>
                                                                            <td className="px-2 py-2">50 JD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">المبلغ</td>
                                                                            <td className="px-2 py-2">تم الإلغاء</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="max-w-xs m-5">
                                                        <div className="bg-gray-100 shadow-xl rounded-lg py-3">
                                                            <div className="p-2">
                                                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                                                    نوع الخدمة
                                                                </h3>
                                                                {/* <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Web Developer</p>
                </div> */}
                                                                <table className="text-xs my-3">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                الموقع
                                                                            </td>
                                                                            <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">رقم الهاتف </td>
                                                                            <td className="px-2 py-2">+977 9955221114</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">التاريخ</td>
                                                                            <td className="px-2 py-2">9-7-2023</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">المبلغ</td>
                                                                            <td className="px-2 py-2">50 JD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-2 py-2 text-gray-500 font-semibold">الحالة</td>
                                                                            <td className="px-2 py-2">تمت</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                            <div className="container mx-auto px-4">
                                <div className="flex flex-wrap items-center md:justify-between justify-center">
                                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                                            تواصل معنا {" "}
                                            <a
                                                href="ContactUs"
                                                className="text-blueGray-500 hover:text-gray-800"
                                                target="_blank"
                                            >
                                                هنا
                                            </a>{" "}
                                            , اقرأ عنا {" "}
                                            <a
                                                href="AboutUs"
                                                className="text-blueGray-500 hover:text-blueGray-800"
                                                target="_blank"
                                            >
                                                {" "}
                                                هنا
                                            </a>
                                            .
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </section>
                </main>
            </>


        </div>
    )
}

export default Profile