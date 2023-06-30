import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confirm from './Confirm';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const [service_id, setServiceId] = useState(null);
    const [serviceTitle, setServiceTitle] = useState(null);
    const [showServices, setShowServices] = useState([]);
    const [getModal, setGetModal] = useState(false);
    const [getAllChoices, setGetAllChoices] = useState([]);
    const [service, setService] = useState('');
    const [choice, setChoice] = useState('');
    const [choiceTitle, setChoiceTitle] = useState('');

    const getServices = async () => {
        try {
            const response = await axios.get('http://localhost:8181/services/getService');
            const services = response.data;
            setShowServices(services.filter((service) => !service.deleted));
        } catch (error) {
            console.log('Error getting services data:', error);
        }
    };

    const getChoices = async (serviceId) => {
        try {
            const response = await axios.get(`http://localhost:8181/getChoices/getChoice/${serviceId}`);
            const allChoices = response.data;
            setGetAllChoices(allChoices.filter((choice) => !choice.deleted));
        } catch (error) {
            console.log('Error getting choices data:', error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    const getDataModal = (serviceId, serviceTitle) => {
        setServiceId(serviceId);
        setServiceTitle(serviceTitle);
        setGetModal(true);
        getChoices(serviceId);
    };

    const closeGetDataModal = () => {
        setGetModal(false);
    };

    const saveService = (serviceId) => {
        setService(serviceId);
    };

    const saveChoice = (choiceID, choiceTitle) => {
        setChoice(choiceID);
        setChoiceTitle(choiceTitle);
    };


    const [isConfirmed, setIsConfirmed] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Perform the data submission logic here
        console.log('Submitting data...');
        console.log('Service:', service);
        console.log('Choice:', choice);
        console.log('Choice Title:', choiceTitle);
        setIsConfirmed(true);
        navigate(`/Confirm?service=${service}&choice=${choice}&choiceTitle=${encodeURIComponent(choiceTitle)}&serviceTitle=${encodeURIComponent(serviceTitle)}`);
    };






    return (
        <div id="Services">
            <h1 className="flex justify-center text-3xl text-black font-bold">الخدمات</h1>
            <hr
                style={{
                    width: '10%',
                    margin: '0 auto',
                    borderWidth: '1px',
                    color: 'black',
                    borderColor: 'black',
                }}
            />
            <div className="py-12 flex flex-wrap justify-center">
                {showServices.map((service) => (
                    <div
                        key={service.id}
                        className="m-5 mx-10  p-6 max-w-[330px] w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg relative z-10"
                    >
                        <div className="rounded-lg mt-[-60px] relative h-[230px]">
                            <div
                                className="transition-all duration-300 ease-in-out absolute w-full h-full top-5 left-0 bg-cover bg-no-repeat rounded-lg"
                                style={{
                                    backgroundImage: `url(${service.image})`,
                                    zIndex: -1,
                                }}
                            ></div>
                        </div>
                        <div className="pt-10">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-body text-black font-semibold mt-2">{service.title}</h2>
                                <button
                                    onClick={() => getDataModal(service.id, service.title)}
                                    className="border-2 border-gray-800 rounded-lg px-3 py-2 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200"
                                >
                                    طلب خدمة
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {getModal && (
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {/* Modal content goes here */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            خيارات {" "}
                            {serviceTitle}
                        </h3>
                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            {getAllChoices.map((choice) => (
                                <div key={choice.id}>
                                    <ul className="my-4 space-y-3">
                                        <button
                                            type="radio"
                                            onClick={() => {
                                                saveChoice(choice.id, choice.choice);
                                                saveService(service_id);
                                            }}
                                        >
                                            <a
                                                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="h-4"
                                                    viewBox="0 0 40 38"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                ></svg>
                                                <span className="flex-1 ml-3 whitespace-nowrap justify-start">{choice.choice}</span>
                                                <span className="inline-flex  justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                                                    {choice.price} دينار
                                                </span>
                                            </a>
                                        </button>
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="m-3 text-green-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-green-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                                onClick={handleSubmit}
                            >
                                تأكيد
                            </button>
                            <button
                                className="m-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                                onClick={closeGetDataModal}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* {isConfirmed && <Confirm service={service} choice={choice} />} */}
        </div>
    );
};

export default Services;
