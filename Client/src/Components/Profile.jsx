import React, { useState, useEffect } from "react";
import useProfileFunctions from './ProfileFunctions'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Rating,
    initTE,
} from "tw-elements";
import axios from "axios";

initTE({ Rating });
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
        phoneNumberError,
        handleSubmitRating,
        handleOpenRatingModal,
        handleCloseRatingModal,
        isRatingModalOpen,
        handleRatingChange,
        rating,
        orderIdToRate,
        orderRates,
        serviceIdToRate,
        id,
        getDoneUserOrder
    } = useProfileFunctions();

    // console.log(serviceIdToRate)
    useEffect(() => {
        AOS.init({
        });
    }, []);


    const handleRateUpdate = async () => {

        try {
            const response = await axios.put(`http://localhost:5151/ratingOrder/rate/${orderIdToRate}`, {
                rating: rating,
                service_id: serviceIdToRate
            })
            console.log(serviceIdToRate)
            console.log(response.data, "rating updated succesfully");
            handleCloseRatingModal();
            getDoneUserOrder(id);
        } catch (error) {
            console.error(error, "Error to handle rating this order");

        }

    }


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
                                            className="btn flex p-2.5 bg-blue-300 rounded-lg hover:rounded-xl hover:bg-blue-400 transition-all duration-300 text-black">  تعديل
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
                                                                    className={` input input-bordered input-info w-full max-w-xs hover:bg-gray-100 block mb-2 text-sm font-medium ${nameError
                                                                        ? 'border-red-500'
                                                                        : 'border-slate-900 text-gray-900 dark:text-white'
                                                                        }`}
                                                                    placeholder="تعديل الإسم"
                                                                />
                                                                <input
                                                                    value={phone_number}
                                                                    onChange={(e) => setPhone(e.target.value)}
                                                                    className={`input input-bordered input-info w-full max-w-xs hover:bg-gray-100 block mb-2 text-sm font-medium ${phoneNumberError
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
                                                                    className="btn glass mx-5 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                                                >
                                                                    تأكيد
                                                                </button>
                                                                <button onClick={handleCloseModal} type="button" className="btn bg-gray-200 hover:bg-gray-300 mx-5">
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
                                    <div data-aos="fade-down"
                                        data-aos-easing="linear"
                                        data-aos-duration="1500" className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <div className='text-xl mb-5 text-gray-600 font-semibold'>
                                                    <h2>طلباتي الحالية</h2>
                                                </div>
                                                <>
                                                    <div className="bg-white p-8 rounded-md w-full">
                                                        <div className=" flex items-center justify-between pb-6">
                                                            {/* <div>
                                                                <h2 className="text-xl text-gray-600 font-semibold">طلباتي الحالية</h2>
                                                            </div> */}
                                                            <div className="flex items-center justify-between">
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
                                                                        className="border-blue-300 hover:bg-gray-100 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
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
                                                                            <tr className="bg-[#B2DEEC]">
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                    الخدمة
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    رقم الطلب
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    المبلغ
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    المزيد
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                    حالة القبول
                                                                                </th>
                                                                                <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                                                        <h2>طلباتي السابقة </h2>
                                                    </div>
                                                    <div>
                                                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                                                <table className="min-w-full leading-normal">
                                                                    <thead>
                                                                        <tr className="bg-[#B2DEEC]">
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                الخدمة
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                رقم الطلب
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                المبلغ
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                المزيد
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                حالة الطلب
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                الحالة
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                                                التقييم
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
                                                                                                className="absolute inset-0 bg-[#B2DFFB] opacity-50 rounded-full" />
                                                                                            <span className="relative"
                                                                                                style={{ color: "GREEN" }}
                                                                                            > Done
                                                                                            </span>
                                                                                        </span>
                                                                                    </td>
                                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <a href="">
                                                                                            <p className="text-blue-400 whitespace-no-wrap">
                                                                                                عرض الفاتورة
                                                                                            </p>
                                                                                        </a>
                                                                                    </td>

                                                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                                        <p
                                                                                            onClick={(e) => {
                                                                                                e.preventDefault(); // Prevent default behavior of the link
                                                                                                handleOpenRatingModal(order.id, order.service_id);
                                                                                                handleRateUpdate(console.log("Hello hind"));
                                                                                            }}
                                                                                            className="text-gray-900 text-xl whitespace-no-wrap cursor-pointer"
                                                                                        >
                                                                                            ⭐ {order?.rating}
                                                                                        </p>
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
                                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 backdrop-blur backdrop-filter bg-opacity-30">
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
                                                            <button onClick={handleCloseDetailsModal} type="button" className="btn bg-gray-200 mx-5">
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

                        {isRatingModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 backdrop-blur backdrop-filter bg-opacity-30 ">
                                <div className="relative px-20 bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button
                                        onClick={handleCloseRatingModal}
                                        type="button"
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="popup-modal"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span onClick={handleCloseRatingModal} className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg
                                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            تقييم الطلب
                                        </h3>
                                        <div className="flex justify-center mb-5 ">
                                            <ul
                                                className="my-1 flex list-none gap-2 p-0 relative z-30"
                                                data-te-rating-init=""
                                                data-te-dynamic="true"
                                                data-te-active="bg-current rounded-[50%] !fill-black"

                                            >
                                                <li
                                                    key={1}
                                                    onClick={() => handleRatingChange(1)}
                                                    className={rating >= 1 ? "text-[#673ab7]" : "text-gray-400"}>
                                                    <span
                                                        className="text-[#673ab7] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current"
                                                        data-te-rating-icon-ref=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            {/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm72.4-118.5c9.7-9 10.2-24.2 1.2-33.9C315.3 344.3 290.6 328 256 328s-59.3 16.3-73.5 31.6c-9 9.7-8.5 24.9 1.2 33.9s24.9 8.5 33.9-1.2c7.4-7.9 20-16.4 38.5-16.4s31.1 8.5 38.5 16.4c9 9.7 24.2 10.2 33.9 1.2zM176.4 272c17.7 0 32-14.3 32-32c0-1.5-.1-3-.3-4.4l10.9 3.6c8.4 2.8 17.4-1.7 20.2-10.1s-1.7-17.4-10.1-20.2l-96-32c-8.4-2.8-17.4 1.7-20.2 10.1s1.7 17.4 10.1 20.2l30.7 10.2c-5.8 5.8-9.3 13.8-9.3 22.6c0 17.7 14.3 32 32 32zm192-32c0-8.9-3.6-17-9.5-22.8l30.2-10.1c8.4-2.8 12.9-11.9 10.1-20.2s-11.9-12.9-20.2-10.1l-96 32c-8.4 2.8-12.9 11.9-10.1 20.2s11.9 12.9 20.2 10.1l11.7-3.9c-.2 1.5-.3 3.1-.3 4.7c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
                                                        </svg>
                                                    </span>
                                                </li>
                                                <li
                                                    key={2}
                                                    onClick={() => handleRatingChange(2)}
                                                    className={rating >= 2 ? "text-[#3f51b5]" : "text-gray-400"}>
                                                    <span
                                                        className="text-[#3f51b5] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current"
                                                        data-te-rating-icon-ref=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            {/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                                            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                                        </svg>
                                                    </span>
                                                </li>
                                                <li key={3}
                                                    onClick={() => handleRatingChange(3)}
                                                    className={rating >= 3 ? "text-[#2196f3]" : "text-gray-400"}>
                                                    <span
                                                        className="text-[#2196f3] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current"
                                                        data-te-rating-icon-ref=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            {/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z" />
                                                        </svg>
                                                    </span>
                                                </li>
                                                <li key={4}
                                                    onClick={() => handleRatingChange(4)}
                                                    className={rating >= 4 ? "text-[#03a9f4]" : "text-gray-400"}>
                                                    <span
                                                        className="text-[#03a9f4] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current"
                                                        data-te-rating-icon-ref=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            {/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                                            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                                        </svg>
                                                    </span>
                                                </li>
                                                <li key={5}
                                                    onClick={() => handleRatingChange(5)}
                                                    className={rating >= 5 ? "text-[#00bcd4]" : "text-gray-400"}>
                                                    <span
                                                        className="text-[#00bcd4] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current"
                                                        data-te-rating-icon-ref=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            {/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM183.2 132.6c-1.3-2.8-4.1-4.6-7.2-4.6s-5.9 1.8-7.2 4.6l-16.6 34.7-38.1 5c-3.1 .4-5.6 2.5-6.6 5.5s-.1 6.2 2.1 8.3l27.9 26.5-7 37.8c-.6 3 .7 6.1 3.2 7.9s5.8 2 8.5 .6L176 240.5l33.8 18.3c2.7 1.5 6 1.3 8.5-.6s3.7-4.9 3.2-7.9l-7-37.8L242.4 186c2.2-2.1 3.1-5.3 2.1-8.3s-3.5-5.1-6.6-5.5l-38.1-5-16.6-34.7zm160 0c-1.3-2.8-4.1-4.6-7.2-4.6s-5.9 1.8-7.2 4.6l-16.6 34.7-38.1 5c-3.1 .4-5.6 2.5-6.6 5.5s-.1 6.2 2.1 8.3l27.9 26.5-7 37.8c-.6 3 .7 6.1 3.2 7.9s5.8 2 8.5 .6L336 240.5l33.8 18.3c2.7 1.5 6 1.3 8.5-.6s3.7-4.9 3.2-7.9l-7-37.8L402.4 186c2.2-2.1 3.1-5.3 2.1-8.3s-3.5-5.1-6.6-5.5l-38.1-5-16.6-34.7zm6.3 175.8c-28.9 6.8-60.5 10.5-93.6 10.5s-64.7-3.7-93.6-10.5c-18.7-4.4-35.9 12-25.5 28.1c24.6 38.1 68.7 63.5 119.1 63.5s94.5-25.4 119.1-63.5c10.4-16.1-6.8-32.5-25.5-28.1z" />
                                                        </svg>
                                                    </span>
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="flex pr-5">
                                            <button
                                                onClick={() => handleSubmitRating(orderIdToRate)}
                                                data-modal-hide="popup-modal"
                                                type="button"
                                                className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                            >
                                                تقييم
                                            </button>
                                            <button
                                                onClick={handleCloseRatingModal}
                                                data-modal-hide="popup-modal"
                                                type="button"
                                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                            >
                                                إلغاء
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                    </section>
                </main >
            </>
        </div >
    )
}
export default Profile