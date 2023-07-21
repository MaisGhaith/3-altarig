import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const ProfileFunctions = () => {
    // let id = 25
    // console.log(id)
    const [user, setUser] = useState({});
    const [user_name, setNameUser] = useState("");
    const [phone_number, setPhone] = useState("");
    const [user_email, setUserEmail] = useState("");


    const [id, setId] = useState("");

    const getUserNameFromToken = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token)
            const decodedToken = jwt_decode(token);
            const id1 = decodedToken.user_id;
            setId(id1);
            try {
                const response = await axios.get(`http://localhost:5151/getUser/${id1}`);
                setUser(response.data[0]);
                console.log(response.data);
                console.log(id1);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    useEffect(() => {
        getUserNameFromToken();
    }, []);
    console.log(id)


    // useEffect(() => {
    //     const getUserData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5151/getUser/${id}`);
    //             setUser(response.data[0]);
    //             console.log(response.data);
    //             console.log(id);
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     getUserData();
    // }, [id]);

    console.log(user)

    console.log(id)
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log(user_name)
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
                console.error('Error when trying to delete the choice:', error);

            }
        }
    }


    return {
        handleEditSubmit,
        setNameUser,
        setPhone,
        setUserEmail,
        user_name,
        phone_number,
        setUser,
        user,
        user_email,
        getUserOrder,
        userOrders,
        userDoneOrders,
        deleteUserOrder
    };
};

export default ProfileFunctions;
