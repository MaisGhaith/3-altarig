import React, { useState, useEffect } from 'react';
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
        <div data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" id="Services" className='mt-16'>
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

            <div className="flex justify-center">
                <div className='py-12 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-8  justify-center '>
                    {showServices.map((service) => (
                        <article class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                            <img
                                alt="Office"
                                src={service.image}
                                class="h-56 w-full object-cover"
                            />

                            <div class="p-4 sm:p-6">
                                <a href="#">
                                    <h3 class="text-lg font-medium text-gray-900">
                                        {service.title}
                                    </h3>
                                </a>

                                <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">

                                </p>

                                <button
                                    onClick={() => getDataModal(service.id, service.title)}
                                    class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                                >
                                    طلب الخدمة

                                    {/* <span aria-hidden="true" class="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                &rarr;
            </span> */}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>




            {/* <div className="py-12 flex flex-wrap justify-center">
                {showServices.map((service) => (
                    <div key={service.id} className="m-5 card w-96 glass">
                        <figure><img src={service.image} alt="car!" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{service.title}</h2>
                            <p>How to park your car at your garage?</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => getDataModal(service.id, service.title)}
                                    className="btn btn-primary">طلب الخدمة</button>
                            </div>
                        </div>
                    </div>
                ))} */}

            {/* <div className="py-12 flex flex-wrap justify-center">
                    {showServices.map((service) => (
                        // <div >
                        <Card key={service.id} className="hover:scale-105 w-96 h-96 m-5 border-2 border-blue-200 ">
                            <CardHeader shadow={false} floated={false} className="h-80">
                                <div
                                    style={{
                                        backgroundImage: `url(${service.image})`,
                                        height: '100%',
                                    }}
                                    className="h-full w-full bg-no-repeat bg-center bg-cover"
                                />
                            </CardHeader>

                            <CardBody>
                                <div className="mb-2 flex items-center justify-between">
                                    <Typography color="blue-gray" className="font-medium">
                                        {service.title}
                                    </Typography>
                                    <Typography
                                        color="blue-gray"
                                        className="flex items-center gap-1.5 font-normal"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="-mt-0.5 h-5 w-5 text-yellow-700"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        5.0
                                    </Typography>
                                </div>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal opacity-75"
                                >

                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button
                                    onClick={() => getDataModal(service.id, service.title)}
                                    ripple={false}
                                    fullWidth={true}
                                    className="text-sm bg-gray-200 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                >
                                    طلب الخدمة
                                </Button>
                            </CardFooter>
                        </Card>
                        // </div>
                    ))}
                </div> */}


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
        // </div >
    );
};

export default Services;
