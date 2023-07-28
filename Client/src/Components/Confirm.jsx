import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Map from './Map';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

const Confirm = (props) => {
    // ! get the userId from userContext
    const { userId } = useContext(UserContext);

    const [img, setImg] = useState("");
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const [isSetAppointment, setIsSetAppointment] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const serviceTitle = searchParams.get('serviceTitle');
    const choice = searchParams.get('choice');
    const choiceTitle = searchParams.get('choiceTitle');
    const serviceId = searchParams.get('serviceId');
    const price = searchParams.get('price')
    const [selectedOption, setSelectedOption] = useState('');


    const generateOrderNumber = () => {
        const prefix = "3T-";
        const randomNum = Math.floor(Math.random() * 1000000);
        const paddedNum = randomNum.toString().padStart(6, "0");
        return prefix + paddedNum;
    };

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        notes: '',
        service_name: serviceTitle || '',
        service_time: isSetAppointment ? selectedDate : 'مستعجل في الحال',
        car_rent: '',
        location: '',
        service_id: serviceId ? parseInt(serviceId) : 0,
        choice_id: choice ? parseInt(choice) : 0,
        user_id: 0,
        choice_name: choiceTitle || '',
        price: price ? parseInt(price) : 0,
        order_no: generateOrderNumber(),
    });

    // ! Map functionality 
    const [map, setMap] = useState(null);
    // const [autocomplete, setAutocomplete] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [markerPosition, setMarkerPosition] = useState({ lat: null, lng: null });
    const [markerKey, setMarkerKey] = useState(0);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBj3pEgJixrXWNe0ejDSOagl-HaHUzkWMA",
        libraries,
    });

    useEffect(() => {
        if (latitude && longitude) {
            setMarkerPosition({ lat: latitude, lng: longitude });
            setMarkerKey((prevKey) => prevKey + 1);
        }
    }, [latitude, longitude]);

    const handleMapLoad = (map) => {
        setMap(map);
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setLatitude(lat);
        setLongitude(lng);
        setMarkerPosition({ lat, lng });
    };

    const handleShareLocation = () => {
        setLoadingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    setLatitude(userLocation.lat);
                    setLongitude(userLocation.lng);
                    setMarkerPosition(userLocation);
                    setLoadingLocation(false);
                },
                (error) => {
                    console.log('Error getting user location:', error);
                    setLoadingLocation(false);
                }
            );
        } else {
            console.log('Geolocation is not supported');
            setLoadingLocation(false);
        }
    };

    if (loadError) {
        return <div>Error loading Google Maps API</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // ! end of map functionality 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataWithDate = {
            ...formData,
            service_time: isSetAppointment ? selectedDate : 'مستعجل في الحال',
            car_rent: selectedOption,
            image: img,
            location: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
        };

        try {
            const response = await axios.post(
                `http://localhost:5151/order/order/${userId}`,
                formDataWithDate
            );
            console.log('Order created:', response.data);
            // Perform any additional actions after successful order creation
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle error cases
        }
    };



    const onChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file);
        }
    };

    // Function to convert file to base64 string
    const getBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    // Function to handle base64 string
    const onLoad = (fileString) => {
        setImg(fileString);
    };





    return (
        <>
            {/* Container for demo purpose */}
            <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12 bg-white">
                {/*Section: Design Block*/}
                <section className="mb-20 text-gray-800 text-center">
                    <h3 className="font-bold text-3xl mb-12">تأكيد الطلب </h3>
                    <div className='flex Items-center justify-center mr-4 mb-5 text-xl'>
                        <h1>  الخدمة المطلوبة :    </h1>
                        <p className=' mr-3 text-lg'> {serviceTitle} {"-"} {choiceTitle} {price}</p>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="mb-6 lg:mb-0 flex-initial shrink w-full lg:w-5/12 lg:pr-3">
                            <div>
                                <button onClick={handleShareLocation}>Share Location</button>
                                {loadingLocation ? (
                                    <div>Loading location...</div>
                                ) : (
                                    <GoogleMap
                                        onLoad={handleMapLoad}
                                        mapContainerStyle={{ width: "500px", height: "400px" }}
                                        center={{ lat: latitude, lng: longitude }}
                                        zoom={17}
                                        onClick={handleMapClick}
                                    >
                                        {latitude && longitude && (
                                            <Marker key={markerKey} position={markerPosition} />
                                        )}
                                    </GoogleMap>
                                )}
                                <div>Selected Location: {`${selectedLocation}, ${latitude},${longitude}`}</div>
                                {/* <button onClick={handleSaveLocation}>Save Location</button> */}
                            </div>
                        </div>



                        <div className="flex-initial shrink w-full lg:w-7/12 lg:pl-3">
                            <form >
                                <br />
                                <br />
                                <div className="flex flex-wrap">
                                    <div className="flex-initial shrink w-full md:w-9/12 md:pr-3">
                                        <div className="grid md:grid-cols-2 md:gap-4 mb-6">
                                            <div className="mb-6 md:mb-0">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone"
                                                    defaultValue={generateOrderNumber()}
                                                    value={formData.order_no}
                                                    onChange={handleChange}
                                                    readOnly />
                                            </div>
                                        </div>


                                        <div className="mb-6">

                                            <textarea
                                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                defaultValue={""}
                                                name="notes"
                                                placeholder="ملاحظات : نوع المركبة, سنة الصنع, سعة المحرك, استفسار .. "
                                                value={formData.notes}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                        <div className="mb-5">

                                            <>
                                                {/* component */}
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        {img ? (
                                                            <div>
                                                                <img
                                                                    src={img}
                                                                    alt="Selected"
                                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                                />
                                                                <p className="text-xs text-gray-500">Selected</p>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <p className="text-xs text-gray-500">
                                                                    PNG, JPG, GIF up to 10MB
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <span>Upload a file</span>
                                                                <input
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    accept="image/*"
                                                                    onChange={onChange}
                                                                />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            PNG, JPG, GIF up to 10MB
                                                        </p>
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

                                            <label className="flex items-center justify-start mt-5 mb-3 text-base font-medium text-[#07074D]">
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

                                            {isSetAppointment && (
                                                <div className="-mx-3 flex flex-wrap">
                                                    <div className="w-full px-3 sm:w-1/2">
                                                        <div className="mb-5">
                                                            <label htmlFor="date" className="flex items-center justify-start mb-3 text-base font-medium text-[#07074D]">
                                                                تحديد التاريخ
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="date"
                                                                id="date"
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                                value={selectedDate}
                                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>



                                        <div className="mb-5">
                                            <label className="flex items-center justify-start mb-3 text-base font-medium text-[#07074D]">
                                                هل ترغب في أن نقوم بتأمين سيارة لك ؟
                                            </label>
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="radio-5"
                                                        className="radio radio-success"
                                                        onChange={() => setSelectedOption('نعم, استئجار سيارة')}
                                                    />
                                                    <label htmlFor="radioButton1" className="pl-3 text-base font-medium text-[#07074D]">
                                                        نعم, استئجار سيارة
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="radio-5"
                                                        className="radio radio-success"
                                                        onChange={() => setSelectedOption('نعم, توصيلة فقط')}
                                                    />
                                                    <label htmlFor="radioButton2" className="pl-3 text-base font-medium text-[#07074D]">
                                                        نعم, توصيلة فقط
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="radio-5"
                                                        className="radio radio-success"
                                                        onChange={() => setSelectedOption('لا أريد')}
                                                    />
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
                                                <span class="relative" onClick={handleSubmit}>تأكيد الطلب </span>
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