import React from 'react';
import '../../src/App.css'
const Home = () => {
    return (
        // <div className='w-full h-screen'>
        //     <video
        //         className='absolute top-0 left-0 w-full h-full object-cover'
        //         autoPlay
        //         loop
        //         muted
        //         src='/Video/car_maintence.mp4'
        //     />

        //     <div className='w-full h-full flex flex-col justify-center items-center text-white px-4 text-center relative max-h-screen'>
        //         <div className='flex flex-col items-center'>
        //             <h1 className='text-5xl font-bold mb-4 sm:text-6xl md:text-7xl'>منصة</h1>
        //             <h1 className='text-5xl mb-4 sm:text-6xl md:text-7xl'>عَ الطريق</h1>
        //             <h1 className='text-xl font-bold mb-6 sm:text-2xl'>
        //                 <span className='blue'>نحن نهتم بها، كما تفعل أنت</span>
        //             </h1>
        //             <button onClick={() => window.location = '#Services'} className='heroButton'>طلب خدمة</button>
        //         </div>
        //     </div>
        // </div>
        // <section>
        //     <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        //         <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
        //             <div className="relative z-10 lg:py-16">
        //                 <div className="relative h-80 sm:h-80 lg:h-full">
        //                     <img src="/Images/main.jpg">

        //                     </img>
        //                 </div>
        //             </div>
        //             <div className="relative flex items-center bg-gray-100">
        //                 <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100" />
        //                 <div className="p-8 sm:p-16 lg:p-24">
        //                     <h2 className="text-2xl font-bold sm:text-3xl">
        //                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
        //                         debitis.
        //                     </h2>
        //                     <p className="mt-4 text-gray-600">
        //                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
        //                         molestiae! Quidem est esse numquam odio deleniti, beatae, magni
        //                         dolores provident quaerat totam eos, aperiam architecto eius quis
        //                         quibusdam fugiat dicta.
        //                     </p>
        //                     <a
        //                         href="#"
        //                         className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        //                     >
        //                         Get in Touch
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>


        <section
            style={{
                backgroundImage: `url("/Images/maain.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            className="relative"
        >
            <>
                <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l" />
                <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            منصة عَ الطريق
                            <strong className="block font-extrabold mt-4 text-rose-700">
                                المكان الأمثل لخدمة سيارتك
                            </strong>
                        </h1>
                        <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
                            tenetur fuga ducimus numquam ea!
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="#Services"
                                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                مقطوع ع الطريق ؟
                            </a>
                            <a
                                href="/ContactUs"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                                تواصل معنا
                            </a>
                        </div>
                    </div>
                </div>
            </>

        </section>
    );
};

export default Home;