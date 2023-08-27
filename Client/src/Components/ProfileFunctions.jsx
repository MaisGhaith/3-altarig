import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { UserContext } from '../Context/UserContext';

const ProfileFunctions = () => {
    const [user, setUser] = useState({});
    const [user_name, setNameUser] = useState("");
    const [phone_number, setPhone] = useState("");
    const [user_email, setUserEmail] = useState("");
    const [deleted, setDeleted] = useState(false)
    const [id, setId] = useState("");


    const getUserNameFromToken = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            const id1 = decodedToken.user_id;
            setId(id1);
            try {
                const response = await axios.get(`http://localhost:5151/getUser/${id1}`);
                setUser(response.data[0]);
                setNameUser(response.data[0].user_name)
                setPhone(response.data[0].phone_number)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    useEffect(() => {
        getUserNameFromToken();
    }, []);


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5151/edit/editUser/${id}`, {
                user_name: user_name,
                phone_number: phone_number,
            });
            getUserNameFromToken();

            if (response.status === 200) {
                setUser(response.data[0]); // Update the user data after successful edit
                setPhone(response.data[0])
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };



    // ! get user orders 
    const [userOrders, setUserOrders] = useState([]);
    const getUserOrder = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5151/userOrders/userOrders/${id}`);

            const orders = response.data;
            setUserOrders(orders);

        } catch (error) {
            console.log("Error getting orders data : ", error);
        }
    }

    useEffect(() => {
        getUserOrder(id);
    }, [id])


    // ! get user done orders 
    const [userDoneOrders, setUserDoneOrders] = useState([]);
    const getDoneUserOrder = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5151/userOrders/userDoneOrders/${id}`);
            const orders = response.data;
            setUserDoneOrders(orders);
        } catch (error) {
            console.log("Error getting orders data: ", error);
        }
    }

    useEffect(() => {
        getDoneUserOrder(id);
    }, [id]);


    // ! delete user order 
    const deleteUserOrder = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this choice ?');
        if (confirmed) {
            try {
                await axios.put(`http://localhost:5151/deleteUserOrders/deleteUserOrder/${id}`);
                console.log("order deleted successfully");
                await getUserOrder();
            } catch (error) {
                console.error('Error when trying to delete the Order:', error);

            }
        }
    }


    // ! copy text function
    const [showAlert, setShowAlert] = useState(false);
    const handleCopy = (textToCopy) => {
        try {
            // Create a temporary textarea element and set its value to the text to copy
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = textToCopy;

            // Append the textarea to the document
            document.body.appendChild(tempTextarea);

            // Select the text inside the textarea
            tempTextarea.select();

            // Use the Clipboard API to copy the selected text to the clipboard
            document.execCommand('copy');

            // Remove the temporary textarea from the document
            document.body.removeChild(tempTextarea);

            setShowAlert(true);

            // Hide the success alert after a few seconds (e.g., 3 seconds)
            setTimeout(() => {
                setShowAlert(false);
            }, 3000); // 3000 milliseconds = 3 seconds
            console.log('تم النسخ بنجاح:', textToCopy);
        } catch (error) {
            console.log('فشل النسخ:', error);
        }
    };

    // ! show full text function
    const [showFullText, setShowFullText] = useState(false);

    function shortenText(text, wordsCount) {
        const words = text.split(' ');
        const shortenedText = words.slice(0, wordsCount).join(' ');
        return shortenedText;
    }

    // ! open Data modal 
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State to control the modal display
    const [orderData, setOrderData] = useState(null);
    const handleOpenDetailsModal = (id) => {
        console.log('Opening the modal...');
        console.log(id)
        setIsDetailsModalOpen(true);
        setOrderData(id);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false)
    }


    // ! edit profile modal 
    const [modal, setModal] = useState(false);
    const handleOpenModal = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    // ! form Date shape function
    function formatDate(dateString) {
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    }


    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter the orders based on the search query for both userOrders and userDoneOrders
    const filteredUserOrders = userOrders.filter((order) =>
        order.service_name.includes() ||
        order.choice_name.includes(searchQuery) ||
        order.order_no.includes(searchQuery)
    );

    const filteredUserDoneOrders = userDoneOrders.filter((order) =>
        order.service_name.includes(searchQuery) ||
        order.choice_name.includes(searchQuery) ||
        order.order_no.includes(searchQuery)
    );


    // ! validation functions 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const validateForm = () => {
        let isValid = true;

        if (!validateName()) {
            setNameError(true);
            isValid = false;
        }

        if (!validateEmail()) {
            setEmailError(true);
            isValid = false;
        }

        if (!validatePhoneNumber()) {
            setPhoneNumberError(true);
            isValid = false;
        }

        if (!validatePassword()) {
            setPasswordError(true);
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid, perform submit action
            console.log("Form submitted");
        }
    };




    const validateName = () => {
        const namePattern = /^[\u0600-\u06FF\sA-Za-z]{6,20}$/;
        return namePattern.test(name);
    };

    const validateEmail = () => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailPattern.test(email);
    };

    const validatePhoneNumber = () => {
        const phoneNumberPattern = /^07[789]\d{7}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    const validatePassword = () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,20}$/;
        return passwordPattern.test(password);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(false);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        setPhoneNumberError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(false);
    };


    // ! rating modal 
    const [orderIdToRate, setOrderIdToRate] = useState(null);
    const [isRatingModalOpen, setRatingModalOpen] = useState(false);

    const [rating, setRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    useEffect(() => {
    }, [handleRatingChange])

    const handleSubmitRating = async () => {
        try {
            // Send rating data to the server
            console.log(orderIdToRate)
            const response = await axios.put(`http://localhost:5151/ratingOrder/rate/${orderIdToRate}`, {
                rating: rating
            });
            console.log(response.data, "rating updated succesfully");

            handleCloseRatingModal();
            getDoneUserOrder(id);
        } catch (error) {
            // Handle errors
            console.error(error, "Error to handle rating this order");
        }
    };
    console.log(orderIdToRate)

    const [serviceIdToRate, setServiceIdToRate] = useState('')
    const handleOpenRatingModal = (orderId, serviceId) => {
        setRatingModalOpen(true);
        setOrderIdToRate(orderId);
        setServiceIdToRate(serviceId)
    };

    const handleCloseRatingModal = () => {
        setRatingModalOpen(false);
    };

    // ! get order rate
    const [orderRates, setOrderRates] = useState([]);
    const getOrderRate = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5151/getOrderRate/getRating/${id}`);

            const rate = response.data;
            console.log(rate)
            setOrderRates(rate);
        } catch (error) {
            console.log("Error getting rate order data : ", error);
        }
    }

    useEffect(() => {
        if (orderIdToRate) {
            getOrderRate(orderIdToRate);
        }
    }, [orderIdToRate])


    return {
        handleEditSubmit,
        setNameUser,
        setPhone,
        user_name,
        phone_number,
        user,
        deleteUserOrder,
        handleCopy,
        showAlert,
        showFullText,
        setShowFullText,
        shortenText,
        isDetailsModalOpen,
        orderData,
        handleOpenDetailsModal,
        handleCloseDetailsModal,
        modal,
        handleOpenModal,
        handleCloseModal,
        formatDate,
        handleSearch,
        filteredUserDoneOrders,
        filteredUserOrders,
        nameError,
        phoneNumberError,
        handleSubmitRating,
        handleOpenRatingModal,
        handleCloseRatingModal,
        isRatingModalOpen,
        handleRatingChange,
        rating,
        orderIdToRate,
        orderRates,
        serviceIdToRate,
        id,
        getDoneUserOrder
    };
};

export default ProfileFunctions;