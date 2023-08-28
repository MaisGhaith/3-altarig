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
    const choiceId = searchParams.get('choice');
    const serviceId = searchParams.get('serviceId');
    const choicePrice = searchParams.get('price')
    const [selectedOption, setSelectedOption] = useState('');
    console.log(choiceId, choiceTitle, choicePrice, serviceId, serviceTitle);


    const state = location.state || {};
    const {
        choice_Id,
        choice_Title,
        choice_Price,
        service_Id,
        service_Title
    } = state;
    console.log(state)
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
        service_name: serviceTitle || state.serviceTitle || '',
        service_time: isSetAppointment ? selectedDate : 'مستعجل في الحال',
        car_rent: '',
        location: '',
        service_id: serviceId || state.serviceId ? parseInt(serviceId || state.serviceId) : 0,
        choice_id: choice || state.choiceId ? parseInt(choice || state.choiceId) : 0,
        user_id: 0,
        choice_name: choiceTitle || state.choiceTitle || '',
        price: choicePrice ? parseInt(choicePrice) : 0,
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
            <div className="container py-12 mx-auto px-4 md:px-6 lg:px-12 bg-gradient-to-b from-[#3E4C5A] via-[#3E4C5A] to-gray-300">

                <section className="mb-20 text-gray-800 space-y-3 ">
                    <div className='w-full text-center mb-12'>
                        <h1 className="font-bold mt-16  text-3xl text-white">تأكيد الطلب </h1>
                    </div>


                    <div className=' flex items-center justify-center pb-4 '>
                        <h1 className='text-xl font-semibold text-white '>  الخدمة المطلوبة :  </h1>
                        <p className=' text-md mt-1 text-white mx-2'>  {serviceTitle || state.serviceTitle} {"-"} {choiceTitle || state.choiceTitle} {choicePrice || state.choicePrice}</p>
                    </div>
                    <div className="w-full px-5 ">
                        <div className='relative h-[200px]'>

                            <div className='absolute inset-0 rounded-md  '>

                                {!latitude ?
                                    <div onClick={handleShareLocation} className='absolute inset-0 cursor-pointer overflow-hidden'>

                                        <div className='text-xl absolute inset-0 z-[9999] font-bold w-full h-full flex items-center justify-center hover:scale-110 scale-100 transform transition-all duration-200'>share your location</div>
                                        <div className='bg-[url(https://staticmapmaker.com/img/google-placeholder.png)] blur-md  absolute inset-0 h-full w-full cursor-pointer rounded-md'>
                                        </div>
                                    </div>
                                    :
                                    <GoogleMap
                                        onLoad={handleMapLoad}
                                        mapContainerStyle={{ width: "100%", height: "200px" }}
                                        center={{ lat: latitude, lng: longitude }}
                                        zoom={17}
                                        onClick={handleMapClick}
                                    >
                                        {latitude && longitude && (
                                            <Marker key={markerKey} position={markerPosition} />
                                        )}
                                    </GoogleMap>
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='flex flex-wrap w-full justify-center gap-10'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white">الاسم</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="الاسم"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-warning input-bordered w-full max-w-xs"
                                />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white">رقم الهاتف</span>
                                </label>
                                <input
                                    placeholder="0778086355"
                                    className="input input-warning input-bordered w-full max-w-xs"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white">رقم الطلب</span>
                                </label>
                                <input
                                    type="text"
                                    name="order_no"
                                    placeholder="order_no"
                                    defaultValue={generateOrderNumber()}
                                    value={formData.order_no}
                                    onChange={handleChange}
                                    className="input input-warning input-bordered w-full max-w-xs text-black cursor-not-allowed"
                                    readOnly />
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full justify-center gap-10 my-10">
                            <div>
                                <label htmlFor='notes' className="label">
                                    <span className="label-text text-white">ملاحظات</span>
                                </label>
                                <textarea id='notes' className="textarea textarea-bordered textarea-warning h-24 w-80"
                                    placeholder="معلومات عن السيارة, النوع, المحرك, سنة الصنع, او معلومات عن العنوان"></textarea>
                            </div>
                            <br />
                            <div className="mb-6">
                                <label
                                    htmlFor="image"
                                    className="block text-sm mt-3 font-medium text-white"
                                >
                                    الصورة
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 w-80 h-24 border-2 border-warning border-solid rounded-md">
                                    <div className=" text-center">
                                        {img ? (
                                            <div>
                                                <img
                                                    src={img}
                                                    alt="Selected"
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-xs text-white">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        )}
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer w-[300px] bg-white rounded-md font-medium text-gray-500 "
                                            >
                                                <span>قم بتحميل صورة</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={onChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full justify-center mx-8 gap-16" >
                            <div className="flex flex-col items-end mb-5">
                                <div className="flex flex-col items-right gap-y-3">
                                    <label className="flex items-center justify-start mt-5 mb-3 text-base font-medium text-white">
                                        تحديد وقت الخدمة المطلوبة
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="radio1"
                                            id="radioButton1"
                                            className="radio radio-warning"
                                            checked={!isSetAppointment}
                                            onChange={() => setIsSetAppointment(false)}

                                        />
                                        <label htmlFor="radioButton1" className="pl-3 mx-2 text-base font-medium text-white">
                                            مستعجل، في الحال
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="radio1"
                                            id="radioButton2"
                                            className="radio radio-warning"
                                            checked={isSetAppointment}
                                            onChange={() => setIsSetAppointment(true)}
                                        />
                                        <label htmlFor="radioButton2" className="pl-3 mx-2 text-base font-medium text-white">
                                            تحديد موعد
                                        </label>
                                    </div>
                                    {isSetAppointment && (
                                        <div className="-mx-3 flex flex-wrap">
                                            <div className="w-full px-3 sm:w-1/2">
                                                <div className="mb-5">
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        id="date"
                                                        className="w-72 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        value={selectedDate}
                                                        onChange={(e) => setSelectedDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col mb-5 mx-24 my-4">
                                <label htmlFor='car-rent' className="flex justify-end mb-3 text-base font-medium text-white">
                                    هل ترغب في أن نقوم بتأمين سيارة لك ؟
                                </label>
                                <div className="flex flex-col items-start gap-y-3">
                                    <div className="flex items-center">
                                        <input
                                            id='car-rent'
                                            type="radio"
                                            name="radio-5"
                                            className="radio radio-warning"
                                            onChange={() => setSelectedOption('نعم, استئجار سيارة')}
                                        />
                                        <label htmlFor="radioButton1" className="pl-3 mx-2 text-base font-medium text-white">
                                            نعم, استئجار سيارة
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="radio-5"
                                            className="radio radio-warning"

                                            onChange={() => setSelectedOption('نعم, توصيلة فقط')} />
                                        <label htmlFor="radioButton2" className="pl-3 mx-2 text-base font-medium text-white">
                                            نعم, توصيلة فقط
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            aria-label="لا أريد"
                                            type="radio"
                                            name="radio-5"
                                            className="radio radio-warning"
                                            onChange={() => setSelectedOption('لا أريد')}
                                        />
                                        <label htmlFor="radioButton3" className="pl-3 mx-2 text-base font-medium text-white">
                                            لا أريد
                                        </label>
                                    </div>
                                </div>

                                <div className='flex justify-end'>

                                    <button onClick={handleSubmit} className="btn btn-outline border-yellow-500 bg-yellow-200 hover:border-yellow-400 hover:bg-yellow-300 hover:text-black text-black mt-20">تأكيد الطلب </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >

        </>
    );
};

export default Confirm;