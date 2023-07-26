import React, { useState } from 'react'

const OrderDetailsModal = ({ handleOpenDetailsModal, handleCloseDetailsModal, formatDate }) => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State to control the modal display
    const [orderData, setOrderData] = useState(null);
    // Function to handle opening the modal
    const handleOpenDetailsModal = (id) => {
        console.log('Opening the modal...');
        console.log(id)
        setIsDetailsModalOpen(true);
        setOrderData(id);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false)
    }

    const [showFullText, setShowFullText] = useState(false);

    function shortenText(text, wordsCount) {
        const words = text.split(' ');
        const shortenedText = words.slice(0, wordsCount).join(' ');
        return shortenedText;
    }

    // Assuming "orders" is an array of objects with "notes" field
    const orders = [
        // ... Your array of orders with each order having a "notes" field
    ];


    function formatDate(dateString) {
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    }
    return (
        <div>

            {isDetailsModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <div className="modal-action flex justify-center">
                            <div className="flex flex-col items-center gap-6">
                                <div>
                                    <tbody>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                الموقع
                                            </td>
                                            <a href="">
                                                <td className="px-2 py-2">{orderData?.location}</td>
                                            </a>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                رقم الهاتف
                                            </td>
                                            <td className="px-2 py-2">{orderData?.phone}</td>
                                            {/* {orderData?.phone} */}
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                تاريخ طلب الخدمة
                                            </td>
                                            <td className="px-2 py-2">{formatDate(orderData.date)}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                تاريخ التنفيذ المطلوب
                                            </td>
                                            <td className="px-2 py-2">{orderData.service_time}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                ملاحظات
                                            </td>
                                            <td className="px-2 py-2">
                                                {showFullText ? orderData.notes : shortenText(orderData.notes, 3)}
                                                {!showFullText && orderData.notes.split(' ').length > 3 && (
                                                    <button className="text-green-500" onClick={() => setShowFullText(true)}>
                                                        اقرأ المزيد
                                                    </button>
                                                )}
                                                {showFullText && (
                                                    <button className="text-yellow-500" onClick={() => setShowFullText(false)}>
                                                        إخفاء
                                                    </button>
                                                )}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                                طلب سيارة
                                            </td>
                                            <td className="px-2 py-2">{orderData.car_rent}</td>
                                        </tr>

                                    </tbody>
                                </div>
                                <div className="flex justify-start">
                                    <button onClick={handleCloseDetailsModal} type="button" className="btn mx-5">
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default OrderDetailsModal