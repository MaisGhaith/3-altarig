// import { Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import App from "../App";
// import useProfileFunctions from "./ProfileFunctions";
import useProfileFunctions from './ProfileFunctions'

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


    // const [userName, setUserName] = useState("");
    // const [userEmail, setUserEmail] = useState("");
    // const [userPhoneNumber, setUserPhoneNumber] = useState("");

    // const [id, setId] = useState("");
    // useEffect(() => {
    //     const getUserNameFromToken = () => {
    //         const token = localStorage.getItem("token");
    //         if (token) {
    //             const decodedToken = jwt_decode(token);
    //             const id1 = decodedToken.user_id;

    //             setId(id1);
    //             setUserEmail(email);
    //             setUserName(name);
    //             setUserPhoneNumber(phone);
    //             console.log(id1, email, name, phone);
    //         }
    //     };

    //     getUserNameFromToken();
    // }, []);

    const {
        handleEditSubmit,
        setNameUser,
        setPhone,
        setUserEmail,
        user_name,
        phone_number,
        setUser,
        user,
        user_email,
        getUserOrder,
        userOrders,
        userDoneOrders,
        deleteUserOrder
    } = useProfileFunctions();

    return (
        <div>
            {/* <Profile userName={userName} /> */}

            {/* <App userName={userName} /> */}

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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <dialog id="my_modal_1" className="modal">
                                            <form method="dialog" className="modal-box">
                                                <h3 className="font-bold text-lg">Hello!</h3>
                                                <div className="modal-action flex justify-center">
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div className="flex flex-col gap-6">
                                                            <input
                                                                value={user_name}
                                                                onChange={(e) => setNameUser(e.target.value)}
                                                                className={`block mb-2 text-sm font-medium ${nameError ? 'border-red-500' : 'border-slate-900 text-gray-900 dark:text-white'
                                                                    }`}
                                                                placeholder="تعديل الإسم"
                                                            />
                                                            <input
                                                                value={phone_number}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                className={`block mb-2 text-sm font-medium ${phoneNumberError ? 'border-red-500' : 'border-slate-900 text-gray-900 dark:text-white'
                                                                    }`}
                                                                placeholder="تعديل رقم الهاتف"
                                                            />
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <button
                                                                onClick={handleEditSubmit}
                                                                type="submit"
                                                                className="btn mx-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                                            >
                                                                تأكيد
                                                            </button>
                                                            <button type="button" className="btn mx-5">
                                                                إلغاء
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </dialog>

                                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            {user?.user_name || ""}
                                        </h3>

                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-solid fa-at mx-2 text-lg text-blueGray-400" />
                                            {user?.user_email || ""}
                                        </div>

                                        <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-phone-alt mx-2 text-lg text-blueGray-400" />
                                            {user?.phone_number || ""}
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
                                                    {userOrders.map((order) => {
                                                        return (
                                                            <div className="max-w-xs m-5" key={order.id}>
                                                                <div className="bg-gray-100 shadow-xl rounded-lg py-3">
                                                                    <div className="p-2">
                                                                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                                                            {order.service_name}
                                                                        </h3>
                                                                        <table className="text-xs my-3">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        الموقع
                                                                                    </td>
                                                                                    <td className="px-2 py-2">{order.location}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        رقم الهاتف
                                                                                    </td>
                                                                                    <td className="px-2 py-2">{order.phone}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        التاريخ
                                                                                    </td>
                                                                                    <td className="px-2 py-2">{order.date}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        المبلغ
                                                                                    </td>
                                                                                    {/* <td className="px-2 py-2">{order.amount}</td> */}
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <div className="text-center my-3">
                                                                            {/* <button className="m-2 text-yellow-500 hover:scale-105 hover:text-black font-medium" href="#">
                  تعديل
              </button> */}
                                                                            <button onClick={() => deleteUserOrder(order.id)} className="m-2 text-red-500 hover:scale-105 hover:text-black font-medium" href="#">
                                                                                حذف
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
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
                                                    {userDoneOrders.map((order) => {
                                                        return (
                                                            <div className="max-w-xs m-5" key={order.id}>
                                                                <div className="bg-gray-100 shadow-xl rounded-lg py-3">
                                                                    <div className="p-2">
                                                                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                                                                            {order.service_name}
                                                                        </h3>
                                                                        <table className="text-xs my-3">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        الموقع
                                                                                    </td>
                                                                                    <td className="px-2 py-2">{order.location}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        رقم الهاتف
                                                                                    </td>
                                                                                    <td className="px-2 py-2">{order.phone}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        التاريخ
                                                                                    </td>
                                                                                    <td className="px-2 py-2">{order.date}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                                        المبلغ
                                                                                    </td>
                                                                                    {/* <td className="px-2 py-2">{order.amount}</td> */}
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
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
                </main >
            </>


        </div >
    )
}

export default Profile