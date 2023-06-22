// import React from 'react'

// const Confirm = () => {
//     return (
//         <div>
//             <>
//                 <meta charSet="UTF-8" />
//                 <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <title>Tailwind CSS Simple Ecommerce Checkout Page UI Example </title>
//                 <link
//                     href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
//                     rel="stylesheet"
//                 />
//                 <div className="mt-20">
//                     <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
//                         Tailwind CSS Ecommerce Checkout Page UI
//                     </h1>
//                 </div>
//                 <div className="container p-12 mx-auto">
//                     <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
//                         <div className="flex flex-col md:w-full">
//                             <h2 className="mb-4 font-bold md:text-xl text-heading ">
//                                 Shipping Address
//                             </h2>
//                             <form className="justify-center w-full mx-auto" method="post" action="">
//                                 <div className="">
//                                     <div className="space-x-0 lg:flex lg:space-x-4">
//                                         <div className="w-full lg:w-1/2">
//                                             <label
//                                                 htmlFor="firstName"
//                                                 className="block mb-3 text-sm font-semibold text-gray-500"
//                                             >
//                                                 First Name
//                                             </label>
//                                             <input
//                                                 name="firstName"
//                                                 type="text"
//                                                 placeholder="First Name"
//                                                 className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
//                                             />
//                                         </div>
//                                         {/* <div className="w-full lg:w-1/2 ">
//                                             <label
//                                                 htmlFor="firstName"
//                                                 className="block mb-3 text-sm font-semibold text-gray-500"
//                                             >
//                                                 Last Name
//                                             </label>
//                                             <input
//                                                 name="Last Name"
//                                                 type="text"
//                                                 placeholder="Last Name"
//                                                 className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
//                                             />
//                                         </div> */}
//                                     </div>
//                                     <div className="mt-4">
//                                         <div className="w-full">
//                                             <label
//                                                 htmlFor="Email"
//                                                 className="block mb-3 text-sm font-semibold text-gray-500"
//                                             >
//                                                 Email
//                                             </label>
//                                             <input
//                                                 name="Last Name"
//                                                 type="text"
//                                                 placeholder="Email"
//                                                 className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="mt-4">
//                                         <div className="w-full">
//                                             <label
//                                                 htmlFor="Address"
//                                                 className="block mb-3 text-sm font-semibold text-gray-500"
//                                             >
//                                                 Address
//                                             </label>
//                                             <textarea
//                                                 className="w-1/2 px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
//                                                 name="Address"
//                                                 cols={20}
//                                                 rows={4}
//                                                 placeholder="Address"
//                                                 defaultValue={""}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="space-x-0 lg:flex lg:space-x-4">
//                                         <div className="w-full lg:w-1/2">
//                                             <label
//                                                 htmlFor="city"
//                                                 className="block mb-3 text-sm font-semibold text-gray-500"
//                                             >
//                                                 City
//                                             </label>
//                                             <input
//                                                 name="city"
//                                                 type="text"
//                                                 placeholder="City"
//                                                 className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
//                                             />
//                                         </div>
//                                         <div className="w-full lg:w-1/2 ">
//                                             <label
//                                                 htmlFor="postcode"
//                                                 className="block mb-3 text-sm font-semibold text-gray-500"
//                                             >
//                                                 Postcode
//                                             </label>
//                                             <input
//                                                 name="postcode"
//                                                 type="text"
//                                                 placeholder="Post Code"
//                                                 className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center mt-4">
//                                         <label className="flex items-center text-sm group text-heading">
//                                             <input
//                                                 type="checkbox"
//                                                 className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
//                                             />
//                                             <span className="ml-2">
//                                                 Save this information for next time
//                                             </span>
//                                         </label>
//                                     </div>
//                                     <div className="relative pt-3 xl:pt-6">
//                                         <label
//                                             htmlFor="note"
//                                             className="block mb-3 text-sm font-semibold text-gray-500"
//                                         >
//                                             {" "}
//                                             Notes (Optional)
//                                         </label>
//                                         <textarea
//                                             name="note"
//                                             className="flex items-center w-1/2 px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
//                                             rows={4}
//                                             placeholder="Notes for delivery"
//                                             defaultValue={""}
//                                         />
//                                     </div>
//                                     <div className="mt-4">
//                                         <button className="w-1/2 px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">
//                                             Process
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                         {/* <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
//                             <div className="pt-12 md:pt-0 2xl:ps-4">
//                                 <h2 className="text-xl font-bold">Order Summary</h2>
//                                 <div className="flex p-4 mt-4">
//                                     <h2 className="text-xl font-bold">ITEMS 2</h2>
//                                 </div>
//                                 <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
//                                     Subtotal<span className="ml-2">$40.00</span>
//                                 </div>
//                                 <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
//                                     Shipping Tax<span className="ml-2">$10</span>
//                                 </div>
//                                 <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
//                                     Total<span className="ml-2">$50.00</span>
//                                 </div>
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </>

//         </div>
//     )
// }

// export default Confirm



import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Swal from 'sweetalert2'

const Confirm = () => {
    const [isSetAppointment, setIsSetAppointment] = useState(false);


    const submitButton = () => {
        Swal.fire({
            title: 'هل تريد تأكيد الطلب؟',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#A0D8B3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'حسنًا',
            cancelButtonText: 'إلغاء',
            onBeforeOpen: () => {
                const swalModal = Swal.getPopup();
                swalModal.style.display = 'flex';
                swalModal.style.flexDirection = 'column';
                swalModal.style.justifyContent = 'center';
                swalModal.style.alignItems = 'center';
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'تم تأكيد الطلب!',
                    text: 'تم الطلب بنجاح، سيتم التواصل معك في الوقت المحدد',
                    icon: 'success',
                    confirmButtonText: 'حسنًا', // Change the text for the confirm button in the second alert
                    didClose: () => {
                        window.location.href = '/'; // Replace '/' with the desired URL of the home page
                    }
                });
            }
        });
    };



    return (
        <>
            {/* Container for demo purpose */}
            <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12 bg-white">
                {/*Section: Design Block*/}
                <section className="mb-20 text-gray-800 text-center">
                    <h3 className="font-bold text-3xl mb-12">تأكيد الطلب </h3>
                    <div className='flex Items-center justify-start mr-4 mb-5 text-xl'>
                        <h1>  الخدمة المطلوبة :    </h1>
                        <p className=' mr-3 text-lg'> lorem </p>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="mb-6 lg:mb-0 flex-initial shrink w-full lg:w-5/12 lg:pr-3">
                            <h1 className="text-black flex justify-right mb-5">
                                <span> * </span> قم بتحديد موقع السيارة :
                            </h1>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.57348593182!2d-74.00599512526003!3d40.72586666928451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f988156a9%3A0xd54629bdf9d61d68!2sBroadway-Lafayette%20St!5e0!3m2!1spl!2spl!4v1624523797308!5m2!1spl!2spl"
                                className="h-56 md:h-full w-full border-0 rounded-md"
                                allowFullScreen=""
                                loading="lazy"
                                required
                            />
                        </div>
                        <div className="flex-initial shrink w-full lg:w-7/12 lg:pl-3">
                            <form>
                                <br />
                                <br />
                                <div className="flex flex-wrap">
                                    <div className="flex-initial shrink w-full md:w-9/12 md:pr-3">
                                        <div className="grid md:grid-cols-2 md:gap-4 mb-6">
                                            <div className="mb-6 md:mb-0">
                                                <input
                                                    type="text"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="exampleX1"
                                                    placeholder="الاسم "
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="tel"
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    id="exampleX2"
                                                    placeholder="رقم الهاتف"
                                                    required
                                                />
                                            </div>
                                        </div>


                                        <div className="mb-6">
                                            <textarea
                                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="exampleX4"
                                                rows={4}
                                                placeholder="ملاحظات : نوع المركبة, سنة الصنع, سعة المحرك, استفسار .. "
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="mb-5">

                                            <>
                                                {/* component */}
                                                <div className="w-full relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg">
                                                    <div className="rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300">
                                                        <label
                                                            className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
            rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none
            focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                                            htmlFor="restaurantImage"
                                                        >
                                                            اختر صورة
                                                            <input id="restaurantImage" className="text-sm cursor-pointer w-36 hidden" type="file" />
                                                        </label>
                                                        <button
                                                            className="inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
            rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none
            focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                                        >
                                                            حذف الصورة
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="relative order-first md:order-last h-40 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
                                                        style={{ minHeight: '40px' }}
                                                    >
                                                        <span className="text-gray-400 opacity-75">
                                                            <svg
                                                                className="w-14 h-14"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="0.7"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </>

                                            <label className="flex items-center justify-start mt-5 mb-3 block text-base font-medium text-[#07074D]">
                                                تحديد وقت الخدمة المطلوبة
                                            </label>
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="radio1"
                                                        id="radioButton1"
                                                        className="h-5 w-5"
                                                        checked={!isSetAppointment}
                                                        onChange={() => setIsSetAppointment(false)}
                                                    />
                                                    <label htmlFor="radioButton1" className="pl-3 text-base font-medium text-[#07074D]">
                                                        مستعجل، في الحال
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="radio1"
                                                        id="radioButton2"
                                                        className="h-5 w-5"
                                                        checked={isSetAppointment}
                                                        onChange={() => setIsSetAppointment(true)}
                                                    />
                                                    <label htmlFor="radioButton2" className="pl-3 text-base font-medium text-[#07074D]">
                                                        تحديد موعد
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {isSetAppointment && (
                                            <div className="-mx-3 flex flex-wrap">
                                                <div className="w-full px-3 sm:w-1/2">
                                                    <div className="mb-5">
                                                        <label htmlFor="date" className="flex items-center justify-start mb-3 block text-base font-medium text-[#07074D]">
                                                            تحديد التاريخ
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="date"
                                                            id="date"
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}


                                        <div className="mb-5">
                                            <label className="flex items-center justify-start mb-3 block text-base font-medium text-[#07074D]">
                                                هل ترغب في أن نقوم بتأمين سيارة لك ؟
                                            </label>
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio" name="radio-5" className="radio radio-success" />
                                                    <label htmlFor="radioButton1" className="pl-3 text-base font-medium text-[#07074D]">
                                                        نعم, استئجار سيارة
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio" name="radio-5" className="radio radio-success" />
                                                    <label htmlFor="radioButton2" className="pl-3 text-base font-medium text-[#07074D]">
                                                        نعم, توصيلة فقط
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio" name="radio-5" className="radio radio-success" />
                                                    <label htmlFor="radioButton3" className="pl-3 text-base font-medium text-[#07074D]">
                                                        لا أريد
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center md:text-left">
                                            <a href="#_" class="relative px-5 py-2 font-medium text-white group">
                                                <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                                                <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
                                                <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                                                <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                                                <span class="relative" onClick={submitButton}>تأكيد الطلب </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Confirm;