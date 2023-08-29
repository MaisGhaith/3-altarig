import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';

const AboutUs = () => {

    return (
        <div>
            <section className="flex items-center mt-16 bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <div className="  px-4 mb-10 lg:w-1/2 lg:mb-0">
                            <div className="relative lg:max-w-md">
                                <img
                                    src="/Images/aboutus.jpg"
                                    alt="aboutimage"
                                    className="relative z-10 object-cover w-full lg:rounded-tr-[80px] lg:rounded-bl-[80px] h-96"
                                />
                                <div className="absolute text-black bottom-0 right-0 z-10 p-8 bg-white border-4 border-yellow-300/90 rounded shadow">
                                    <p className="text-lg font-semibold md:w-72">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="absolute top-0 left-0 w-16 h-16 text-blue-700 dark:text-gray-300 opacity-10"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
                                        </svg>{" "}
                                        النجاح يبدأ بفكرة
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className=" px-6 mb-10 lg:w-1/2 lg:mb-0 ">
                            <div className="pl-4 mb-6 border-l-4 border-yellow-300/90 ">
                                <span className="text-sm text-gray-600 uppercase dark:text-gray-400">
                                    من نحن ؟
                                </span>
                                <h1 className="mt-8 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                                    منصة عَ الطريق
                                </h1>
                            </div>
                            <p className="mb-6 mt-10 py-5 text-base leading-7 text-gray-500 dark:text-gray-400">
                                منصة عَ الطريق, هي منصة مختصة بتقديم خدمات صيانة السيارات, الخدمات موجهة للموظفات الإناث
                                بشكل عام, والمجتمع ككل بشكل عام, حيث أن فكرتنا هدفها التسهيل على الموظفات القيام بعمليات
                                الصيانة الدورية للسيارة, وفي حال الانقطاع يتم توفير سيارة بديلة أو توصيلة لهم.
                            </p>
                            <a
                                href="/ContactUs"
                                className="px-4 py-2 rounded btn btn-outline btn-warning"
                            >
                                تواصل معنا
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            {/* <section className="flex items-center py-10 mt-16 bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                            <div className="relative">
                                <img
                                    src="https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg"
                                    alt=""
                                    className="relative z-40 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded"
                                />
                                <div className="absolute z-10 hidden w-full h-full bg-blue-400 rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
                                <div className="absolute z-50 text-blue-400 transform -translate-y-1/2 cursor-pointer top-1/2 left-[46%] hover:text-blue-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="w-14 h-14 bi bi-play-circle-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <div className="relative">
                                <h1 className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden">
                                    About Us
                                </h1>
                                <h1 className="pl-2 text-3xl font-bold border-l-8 border-blue-400 md:text-5xl dark:text-white">
                                    Welcome to our site
                                </h1>
                            </div>
                            <p className="mt-6 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing
                                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                            </p>
                            <a
                                href="#"
                                className="px-4 py-3 text-gray-50 transition-all transform bg-blue-400 rounded-[80px] hover:bg-blue-500 dark:hover:text-gray-100 dark:text-gray-100 "
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </section> */}


        </div>
    );
};

export default AboutUs;




// import React from 'react'

// const AboutUs = () => {
//     return (
//         <div>
//             <section className=" flex items-center py-10 bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
//                 <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
//                     <div className="flex">
//                         <div className="w-1/2 px-4 mb-10 lg:w-1/2 lg:mb-0">
//                             <div className="relative">
//                                 <img
//                                     src="https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg"
//                                     alt=""
//                                     className="relative z-40 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] "
//                                 />
//                                 <div className="absolute z-10 hidden w-full h-full bg-teal-400 rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
//                                 <div className="absolute z-50 text-teal-400 transform -translate-y-1/2 cursor-pointer top-1/2 left-[46%] hover:text-teal-500">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width={16}
//                                         height={16}
//                                         fill="currentColor"
//                                         className="w-14 h-14 bi bi-play-circle-fill"
//                                         viewBox="0 0 16 16"
//                                     >
//                                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-1/2 px-4 mb-10 lg:w-1/2 lg:mb-0 ">
//                             <div className="relative">
//                                 <h1 className="absolute text-white -top-20 left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block">
//                                     About Us
//                                 </h1>
//                                 <h1 className=" pl-2 text-3xl font-bold border-l-8 border-teal-400 md:text-5xl dark:text-white">
//                                     Welcome to our site
//                                 </h1>
//                             </div>

//                             <p className="mt-6 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//                                 minim veniam Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//                                 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//                                 enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing
//                                 elit, sed do eiusmod tempor incididunt ut labore et dolore magna
//                                 aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur
//                                 adipiscing elit, sed do eiusmod tempor
//                             </p>
//                             <a
//                                 href="#"
//                                 className="px-4 py-3 text-gray-50 transition-all transform bg-teal-400 rounded-[80px] hover:bg-teal-500 dark:hover:text-gray-100 dark:text-gray-100 "
//                             >
//                                 Learn more
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//         </div>
//     )
// }

// export default AboutUs