import React from 'react';
import '../../src/App.css'
const Home = () => {
    return (

        // <section
        //     style={{
        //         backgroundImage: `url("/Images/maain.jpg")`,
        //         backgroundSize: 'cover',
        //         backgroundPosition: 'center',
        //         backgroundRepeat: 'no-repeat',
        //     }}
        //     className="relative"
        // >
        //     <>
        //         <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l" />
        //         <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        //             <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        //                 <h1 className="text-3xl font-extrabold sm:text-5xl">
        //                     منصة عَ الطريق
        //                     <strong className="block font-extrabold mt-4 text-rose-700">
        //                         المكان الأمثل لخدمة سيارتك
        //                     </strong>
        //                 </h1>
        //                 <p className="mt-4 max-w-lg sm:text-xl/relaxed">
        //                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        //                     tenetur fuga ducimus numquam ea!
        //                 </p>
        //                 <div className="mt-8 flex flex-wrap gap-4 text-center">
        //                     <a
        //                         href="#Services"
        //                         className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        //                     >
        //                         مقطوع ع الطريق ؟
        //                     </a>
        //                     <a
        //                         href="/ContactUs"
        //                         className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        //                     >
        //                         تواصل معنا
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>
        //     </>

        // </section>

        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(Images/maain.jpg)', backgroundAttachment: 'fixed' }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="flex justify-start text-neutral-content w-full px-10 md:px-24">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold text-[#252525]">منصة ع الطريق</h1>
                        <p className="mb-5 text-3xl font-bold text-yellow-400">
                            المكان الأمثل لخدمة سيارتك
                        </p>
                        <p className="mb-5 text-xl">
                            منصة مختصة بتقديم خدمات صيانة السيارات وموجهة للموظفات و الموظفين بشكل خاص، حيث نتعهد بصيانة السيارة بشكل سريع ومتقن.
                        </p>
                        <button className="btn btn-outline btn-warning">مقطوع عَ الطريق ؟</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;