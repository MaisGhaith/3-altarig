import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Confirm from './Confirm';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Replace 'faIconName' with the specific icon you want to use

const Services = () => {

    const [service_id, setServiceId] = useState(null);
    const [serviceTitle, setServiceTitle] = useState(null);
    const [showServices, setShowServices] = useState([]);
    const [getModal, setGetModal] = useState(false);
    const [getAllChoices, setGetAllChoices] = useState([]);
    const [service, setService] = useState('');
    const [choice, setChoice] = useState('');
    const [choiceTitle, setChoiceTitle] = useState('');
    const [price, setPrice] = useState('');


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
        setServiceId(serviceId);
    };

    const saveChoice = (choiceID, choiceTitle, choicePrice) => {
        setChoice(choiceID);
        setChoiceTitle(choiceTitle);
        setPrice(choicePrice)
    };


    const [isConfirmed, setIsConfirmed] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsConfirmed(true);
        navigate(`/Confirm?service=${service}&choice=${choice}&choiceTitle=${encodeURIComponent(choiceTitle)}&serviceTitle=${encodeURIComponent(serviceTitle)}&serviceId=${service_id}&price=${encodeURIComponent(price)}`);
    };

    useEffect(() => {
        AOS.init({
            // Add any options you want to customize the animation behavior
            // For example, you can set the duration, offset, etc.
        });
    }, []);

    return (
        <div className="hero min-h-screen"
        // style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/realistic-car-headlights-ad-composition-headlights-with-green-purple-illumination_1284-56577.jpg?w=1060&t=st=1692133183~exp=1692133783~hmac=08c9732a450793663a80487536b8dfe59d078a9d52efda422d260926d8fd1495)', backgroundAttachment: 'fixed' }}
        >
            <div id="Services" className='mt-16'>
                <h1 data-aos="zoom-in" className="flex justify-center text-3xl text-white font-bold">خدمات عَ الطريق </h1>
                <hr
                    style={{
                        width: '20%',
                        margin: '0 auto',
                        borderWidth: '1px',
                        color: 'black',
                        borderColor: '#FBBD23',
                        marginTop: '24px',
                        marginBottom: '72px'
                    }}
                />
                <div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500" className='flex flex-wrap gap-10 justify-center mt-10 mb-32 '>
                    {showServices.map((service, index) => (
                        <div key={index} className="card w-96 glass">
                            <figure><img src={service.image} alt="car!" /></figure>
                            <div className="card-body">
                                <div className='flex justify-between'>
                                    <h2 className="card-title text-white"> {service.title}</h2>
                                    <div className='flex justify-center'>
                                        <h2 className="card-title text-white"> {typeof service.rating === 'numeric' ? service?.rating.toFixed(2) : service.rating}</h2>
                                        <svg className="w-6 h-7 m-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* <p>{typeof service.rating === 'numeric' ? service?.rating.toFixed(2) : service.rating}</p> */}
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => getDataModal(service.id, service.title)}
                                        className="btn btn-outline btn-warning">طلب الخدمة</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {getModal && (
                    <div className="fixed top-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 ">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-scroll">
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
                                                    saveChoice(choice.id, choice.choice, choice.price);
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
                                                    <span className="flex-1 ml-3  justify-start">{choice.choice}</span>
                                                    <span className="inline-flex justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
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
            </div>
        </div>
        // </div >
    );
};

export default Services;
