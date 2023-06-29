import React from 'react';
import services from './servicesCard.json';

const Services = () => {
    return (
        <div id='Services'>

            <h1 className='flex justify-center text-3xl text-black font-bold'>الخدمات</h1>
            <hr style={{ width: "10%", margin: "0 auto", borderWidth: "1px", color: "black", borderColor: "black" }}
            />
            <div className="py-12 flex flex-wrap justify-center">
                {services.map((service) => (
                    <div key={service.id} className="m-5 mx-10  p-6 max-w-[330px] w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg relative z-10">
                        <div className="rounded-lg mt-[-60px] relative h-[230px]">
                            <div
                                className="transition-all duration-300 ease-in-out absolute w-full h-full top-5 left-0 bg-cover bg-no-repeat rounded-lg"
                                style={{
                                    backgroundImage: `url(${service.img})`,
                                    zIndex: -1,
                                }}
                            ></div>
                        </div>
                        <div className="pt-10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-body text-black font-semibold mt-2">
                                    {service.title}
                                </h2>
                                <button className="border-2 border-gray-800 rounded-lg px-3 py-2 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                    طلب خدمة
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
