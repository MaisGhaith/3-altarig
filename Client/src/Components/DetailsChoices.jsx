import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DetailsChoices = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // قم بجلب البيانات اللازمة من queryParams
    const choiceId = searchParams.get('choiceId');
    const choiceTitle = searchParams.get('choiceTitle');
    const choicePrice = searchParams.get('choicePrice');
    const serviceId = searchParams.get('serviceId');
    const serviceTitle = searchParams.get('serviceTitle');

    const handleNext = () => {
        navigate('/Confirm', {
            state: {
                choiceId,
                choiceTitle,
                choicePrice,
                serviceId,
                serviceTitle
            }
        });
    };

    const [getDetailsData, setGetDetailsData] = useState([]);

    const getDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8181/getChoices/getDetails/${choiceId}`);
            setGetDetailsData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error getting details data:', error);
        }
    };

    useEffect(() => {
        if (choiceId) {
            getDetails();
        }
    }, [choiceId]);

    const [selectedId, setSelectedId] = useState(null);

    const handleRowClick = (id) => {
        setSelectedId(id);
    };
    console.log(selectedId);

    // const handleConfirm = () => {
    //     navigate(`/Confirm?choiceId=${queryParams.choiceId}&choiceName=${queryParams.choiceTitle}&choicePrice=${queryParams.choicePrice}&serviceId=${queryParams.serviceId}&serviceName=${queryParams.serviceTitle}`);
    // };


    return (

        <div>
            < section className="antialiased  bg-gradient-to-b from-[#3E4C5A] via-[#3E4C5A] to-gray-300 text-gray-600 h-screen px-4" >
                <div className="flex flex-col justify-center h-full">
                    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">تفاصيل  {choiceTitle}</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr className="">
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold ">الخدمة</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold">السعر</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold ">النوع</div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-sm divide-y divide-gray-100 overflow-auto">
                                        {getDetailsData.map((detail, index) => (
                                            <tr
                                                key={index}
                                                className={selectedId === detail.id ? 'bg-gray-200' : ''}
                                                onClick={() => handleRowClick(detail.id)}
                                            >
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left flex justify-center">{detail.desc}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium flex justify-center">
                                                        {detail.price}
                                                    </div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">{detail.type}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='flex justify-end'>
                                <Link
                                    to="/Landing">
                                    <button className="btn btn-outline btn-warning flex w-24">رجوع
                                    </button>
                                </Link>
                                <button onClick={handleNext} className="btn btn-outline btn-warning flex w-24">
                                    تأكيد
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            </ section >
        </div >




    )
}

export default DetailsChoices