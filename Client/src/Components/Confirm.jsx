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
            <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12" style={{
                background: "radial-gradient(circle, rgba(62,76,90,0.8044467787114846) 18%, rgba(40,50,61,1) 85%)"
            }}>

                <section className="mb-20 text-gray-800 space-y-3 ">
                    <div className='w-full text-center mb-12'>
                        <h1 className="font-bold  text-3xl ">تأكيد الطلب </h1>
                    </div>
                    <div className=' '>
                        <h1 className='text-xl font-semibold'>  الخدمة المطلوبة :    </h1>
                        <p className=' text-md mt-1'> {serviceTitle} {"-"} {choiceTitle} {price}</p>
                    </div>
                    <div className="w-full px-5 ">
                        {/* <div>Selected Location: {`${selectedLocation}, ${latitude},${longitude}`}</div>
                        <button onClick={handleShareLocation}>Share Location</button> */}
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

                    {/* here */}
                    <div>
                        <div className='flex flex-wrap w-full justify-center gap-10'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>

                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-warning input-bordered w-full max-w-xs"
                                />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Phone</span>

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
                                    <span className="label-text">Order number</span>
                                </label>
                                <input
                                    type="text"
                                    name="order_no"
                                    placeholder="order_no"
                                    defaultValue={generateOrderNumber()}
                                    value={formData.order_no}
                                    onChange={handleChange}
                                    className="input input-warning input-bordered w-full max-w-xs"
                                    disabled
                                    readOnly />
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full justify-center gap-10 my-10">
                            <div>
                                <label htmlFor='notes' className="label">
                                    <span className="label-text">ملاحظات</span>

                                </label>
                                <textarea id='notes' className="textarea textarea-bordered textarea-warning h-24 w-80" placeholder="Add any notes you have..."></textarea>

                            </div>
                            <div className=''>
                                {img ? (
                                    <div>
                                        <img
                                            src={img}
                                            alt="Selected"
                                            className="mx-auto h-12 w-12 text-gray-400"
                                        />

                                    </div>
                                ) : (
                                    <div >
                                        <label htmlFor='image' className="label">
                                            <span className="label-text">إضافة صورة</span>

                                        </label>
                                        <input type="file"
                                            id='image'
                                            className="file-input h-24 file-input-bordered file-input-warning w-full max-w-xs" />

                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap w-full justify-center mx-8 gap-16" >
                            <div className="flex flex-col items-end mb-5">
                                <label className="flex items-center justify-start mt-5 mb-3 text-base font-medium text-[#07074D]">
                                    تحديد وقت الخدمة المطلوبة
                                </label>
                                <div className="flex flex-col items-right gap-y-3">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="radio1"
                                            id="radioButton1"
                                            className="radio radio-warning"
                                            checked={!isSetAppointment}
                                            onChange={() => setIsSetAppointment(false)}

                                        />
                                        <label htmlFor="radioButton1" className="pl-3 mx-2 text-base font-medium text-[#07074D]">
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
                                        <label htmlFor="radioButton2" className="pl-3 mx-2 text-base font-medium text-[#07074D]">
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
                                                    className="w-72 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col mb-5 mx-24 my-4">
                                <label htmlFor='car-rent' className="flex justify-end mb-3 text-base font-medium text-[#07074D]">
                                    هل ترغب في أن نقوم بتأمين سيارة لك ؟
                                </label>
                                <div className="flex flex-col items-start gap-y-3">
                                    <div className="flex items-center">
                                        <input
                                            // aria-label="نعم, استئجار سيارة"
                                            id='car-rent'
                                            type="radio"
                                            name="radio-5"
                                            className="radio radio-warning"
                                            onChange={() => setSelectedOption('نعم, استئجار سيارة')}
                                        />
                                        <label htmlFor="radioButton1" className="pl-3 mx-2 text-base font-medium text-[#07074D]">
                                            نعم, استئجار سيارة
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            // aria-label="نعم, توصيلة فقط"
                                            type="radio"
                                            name="radio-5"
                                            className="radio radio-warning"

                                            onChange={() => setSelectedOption('نعم, توصيلة فقط')} />
                                        <label htmlFor="radioButton2" className="pl-3 mx-2 text-base font-medium text-[#07074D]">
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
                                        <label htmlFor="radioButton3" className="pl-3 mx-2 text-base font-medium text-[#07074D]">
                                            لا أريد
                                        </label>
                                    </div>
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
                </section>
            </div >

        </>
    );
};

export default Confirm;