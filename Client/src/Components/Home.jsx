import React from 'react';
import '../../src/App.css'
const Home = () => {
    return (
        <div className='w-full h-screen'>
            <video
                className='absolute top-0 left-0 w-full h-full object-cover'
                autoPlay
                loop
                muted
                src='/Video/car_maintence.mp4'
            />
            {/* <img src="/Images/main.jpg" alt=""
                className='absolute top-0 left-0 w-full h-full object-cover'

            /> */}

            <div className='w-full h-full flex flex-col justify-center items-center text-white px-4 text-center relative'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-5xl font-bold mb-4 sm:text-6xl md:text-7xl'>منصة</h1>
                    <h1 className='text-5xl mb-4 sm:text-6xl md:text-7xl'>عَ الطريق</h1>
                    <h1 className='text-xl font-bold mb-6 sm:text-2xl'>
                        <span className='blue'>نحن نهتم بها، كما تفعل أنت</span>
                    </h1>
                    <button className='heroButton'>طلب خدمة</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
