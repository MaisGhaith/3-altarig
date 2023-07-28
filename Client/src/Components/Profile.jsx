// import { Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import App from "../App";
// import useProfileFunctions from "./ProfileFunctions";
import useProfileFunctions from './ProfileFunctions'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {

    const {
        handleEditSubmit,
        setNameUser,
        setPhone,
        user_name,
        phone_number,
        user,
        deleteUserOrder,
        handleCopy,
        showAlert,
        showFullText,
        setShowFullText,
        shortenText,
        isDetailsModalOpen,
        orderData,
        handleOpenDetailsModal,
        handleCloseDetailsModal,
        modal,
        handleOpenModal,
        handleCloseModal,
        formatDate,
        handleSearch,
        filteredUserDoneOrders,
        filteredUserOrders,
        nameError,
        phoneNumberError
    } = useProfileFunctions();

    useEffect(() => {
        AOS.init({
            // Add any options you want to customize the animation behavior
            // For example, you can set the duration, offset, etc.
        });
    }, []);

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
                                    <div className="text-center mt-12">

                                        <button onClick={handleOpenModal}
                                            className="btn flex p-2.5 bg-green-400 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">  تعديل
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>

                                        {modal && (
                                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                                <form method="dialog" className="modal-box">
                                                    <h3 className="font-bold text-lg">Hello!</h3>
                                                    <div className="modal-action flex justify-center">
                                                        <div className="flex flex-col items-center gap-6">
                                                            <div className="flex flex-col gap-6">
                                                                <input
                                                                    value={user_name}
                                                                    onChange={(e) => setNameUser(e.target.value)}
                                                                    className={` input input-bordered input-accent w-full max-w-xs hover:bg-gray-100 block mb-2 text-sm font-medium ${nameError
                                                                        ? 'border-red-500'
                                                                        : 'border-slate-900 text-gray-900 dark:text-white'
                                                                        }`}
                                                                    placeholder="تعديل الإسم"
                                                                />
                                                                <input
                                                                    value={phone_number}
                                                                    onChange={(e) => setPhone(e.target.value)}
                                                                    className={`input input-bordered input-accent w-full max-w-xs hover:bg-gray-100 block mb-2 text-sm font-medium ${phoneNumberError
                                                                        ? 'border-red-500'
                                                                        : 'border-slate-900 text-gray-900 dark:text-white'
                                                                        }`}
                                                                    placeholder="تعديل رقم الهاتف"
                                                                />
                                                            </div>
                                                            <div className="flex justify-start">
                                                                <button
                                                                    onClick={handleEditSubmit}
                                                                    type="submit"
                                                                    className="btn glass mx-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                                                >
                                                                    تأكيد
                                                                </button>
                                                                <button onClick={handleCloseModal} type="button" className="btn mx-5">
                                                                    إلغاء
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        )}


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
                                                <>
                                                    <div className="bg-white p-8 rounded-md w-full">
                                                        <div className=" flex items-center justify-between pb-6">
                                                            <div>
                                                                <h2 className="text-xl text-gray-600 font-semibold">طلباتي الحالية</h2>
                                                            </div>
                                                            <div data-aos="fade-zoom-in"
                                                                data-aos-easing="ease-in-back"
                                                                data-aos-delay="300"
                                                                data-aos-offset="0" className="flex items-center justify-between">
                                                                <div className="pt-2 relative mx-auto text-gray-600">

                                                                    <button type="submit" className="absolute right-32 top-0 mt-5 mr-4 pl-6">
                                                                        <svg
                                                                            className="text-gray-600 h-4 w-4 fill-current"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                            version="1.1"
                                                                            id="Capa_1"
                                                                            x="0px"
                                                                            y="0px"
                                                                            viewBox="0 0 56.966 56.966"
                                                                            style={{ enableBackground: "new 0 0 56.966 56.966" }}
                                                                            xmlSpace="preserve"
                                                                            width="512px"
                                                                            height="512px"
                                                                        >
                                                                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                                        </svg>
                                                                    </button>
                                                                    <input
                                                                        className="border-2 border-green-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                                                        type="search"
                                                                        name="search"
                                                                        placeholder="Search"
                                                                        onChange={handleSearch} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center items-end h-full">
                                                            <div className="alert-container fixed bottom-4 w-1/6 z-50">
                                                                {showAlert && (
                                                                    <div
                                                                        className="p-4 text-sm text-green-900 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400"
                                                                        role="alert">
                                                                        تم النسخ بنجاح
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                                                    <table className="min-w-full leading-normal">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                    الخدمة
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    رقم الطلب
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    المبلغ
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    المزيد
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    حالة القبول
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    الحالة
                                                                                </th>
                                                                            </tr>
                                                                        </thead>

                                                                        {filteredUserOrders.map((order) => {
                                                                            return (
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                                                                            <div className="flex items-center">
                                                                                                <div className="ml-3">
                                                                                                    <p className=" w-48 text-gray-900 whitespace-no-wrap">
                                                                                                        {order.service_name} {order.choice_name}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td
                                                                                            onClick={() => handleCopy(order.order_no)}
                                                                                            style={{ cursor: 'copy' }}
                                                                                            className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                                                                            <p className="text-gray-900 whitespace-no-wrap">{order.order_no}</p>
                                                                                        </td>
                                                                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                                                {order.price} JD
                                                                                            </p>
                                                                                        </td>
                                                                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                                                                            <button
                                                                                                data-modal-target="authentication-modal"
                                                                                                data-modal-toggle="authentication-modal"
                                                                                                onClick={() => handleOpenDetailsModal(order)}
                                                                                                className="border border-none">
                                                                                                <p className="text-gray-900 whitespace-no-wrap">عرض التفاصيل</p>
                                                                                            </button>
                                                                                        </td>
                                                                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                                                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                                                <span
                                                                                                    aria-hidden="" className="absolute inset-0 bg-gray-300 opacity-50 rounded-full" />
                                                                                                <span className="relative"
                                                                                                    style={{ color: order?.approved ? 'green' : 'red' }}>
                                                                                                    {order?.approved ? 'approved' : 'not approved'}
                                                                                                </span>
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                                                                            <div className="text-center my-3">
                                                                                                {order?.approved === false ? (
                                                                                                    <button
                                                                                                        onClick={() => deleteUserOrder(order.id)}
                                                                                                        className="m-2 text-red-500 hover:scale-105 hover:text-black font-medium">
                                                                                                        حذف
                                                                                                    </button>
                                                                                                ) : (
                                                                                                    <button
                                                                                                        className={`m-2 text-yellow-500 hover:scale-105 hover:text-black font-medium 
                                                                                                        ${order?.price === '0' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                                                                                            }`}
                                                                                                        disabled={order?.price === '0'}
                                                                                                    >
                                                                                                        دفع
                                                                                                    </button>
                                                                                                )}
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            )
                                                                        })}
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-aos="fade-down"
                                        data-aos-easing="linear"
                                        data-aos-duration="1500" className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <div className="bg-white p-8 rounded-md w-full">
                                                    <div className='text-xl mb-5 text-gray-600 font-semibold'>
                                                        <h2>طلباتي السابقة</h2>
                                                    </div>
                                                    <div>
                                                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                                                <table className="min-w-full leading-normal">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                الخدمة
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                رقم الطلب
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                المبلغ
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                المزيد
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                حالة الطلب
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                الحالة
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    {filteredUserDoneOrders.map((order) => {
                                                                        return (
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <div className="flex items-center">

                                                                                            <div className="ml-3">
                                                                                                <p className=" w-48 text-gray-900 whitespace-no-wrap">
                                                                                                    {order.service_name} {order.choice_name}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td onClick={() => handleCopy(order.order_no)}
                                                                                        style={{ cursor: 'copy' }} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <p className="text-gray-900 whitespace-no-wrap">{order.order_no}</p>
                                                                                    </td>
                                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                                            {order.price} JD
                                                                                        </p>
                                                                                    </td>
                                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <button
                                                                                            data-modal-target="authentication-modal"
                                                                                            data-modal-toggle="authentication-modal"
                                                                                            onClick={() => handleOpenDetailsModal(order)}
                                                                                            className="border border-none">
                                                                                            <p className="text-gray-900 whitespace-no-wrap">عرض التفاصيل</p>
                                                                                        </button>
                                                                                    </td>
                                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                                            <span
                                                                                                aria-hidden=""
                                                                                                className="absolute inset-0 bg-gray-300 opacity-50 rounded-full" />
                                                                                            <span className="relative"
                                                                                                style={{ color: order?.approved ? 'green' : 'red' }}>
                                                                                                {order?.approved ? 'approved' : 'not approved'}
                                                                                            </span>
                                                                                        </span>
                                                                                    </td>
                                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <a href="">
                                                                                            <p className="text-green-500 whitespace-no-wrap">
                                                                                                عرض الفاتورة
                                                                                            </p>
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        )
                                                                    })}
                                                                </table>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {isDetailsModalOpen &&
                                        <div className="fixed inset-0 flex items-center justify-center z-50">
                                            <form method="dialog" className="modal-box">
                                                <h3 className="font-bold text-lg">Hello!</h3>
                                                <div className="modal-action flex justify-center">
                                                    <div className="flex flex-col items-center gap-6">
                                                        <div>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                        الموقع
                                                                    </td>
                                                                    <a href={orderData?.location} target="_blank">
                                                                        <td className="px-2 py-2">{orderData?.location}</td>
                                                                    </a>
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                        رقم الهاتف
                                                                    </td>
                                                                    <td className="px-2 py-2">{orderData?.phone}</td>
                                                                    {/* {orderData?.phone} */}
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                        تاريخ طلب الخدمة
                                                                    </td>
                                                                    <td className="px-2 py-2">{formatDate(orderData.date)}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                        تاريخ التنفيذ المطلوب
                                                                    </td>
                                                                    <td className="px-2 py-2">{orderData.service_time}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                        ملاحظات
                                                                    </td>
                                                                    <td className="px-2 py-2">
                                                                        {showFullText ? orderData.notes : shortenText(orderData.notes, 3)}
                                                                        {!showFullText && orderData.notes.split(' ').length > 3 && (
                                                                            <button className="text-green-500" onClick={() => setShowFullText(true)}>
                                                                                اقرأ المزيد
                                                                            </button>
                                                                        )}
                                                                        {showFullText && (
                                                                            <button className="text-yellow-500" onClick={() => setShowFullText(false)}>
                                                                                إخفاء
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                                                        طلب سيارة
                                                                    </td>
                                                                    <td className="px-2 py-2">{orderData.car_rent}</td>
                                                                </tr>
                                                            </tbody>
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <button onClick={handleCloseDetailsModal} type="button" className="btn mx-5">
                                                                إلغاء
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    }
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