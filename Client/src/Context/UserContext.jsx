import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState();
    const [role, setRole] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();

    console.log(userName)
    useEffect(() => {
        if (localStorage.token) {
            fetchUserData();
        }
    }, []);


    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.get("http://localhost:5151/auth/auth", {
                    headers: {
                        Authorization: token,
                    },
                });

                console.log("Response data:", response.data); // Check the entire response object

                setUserId(response.data.user_id);
                setUserName(response.data.user_name); // Property name should match 'user_name'
                setRole(response.data.role); // Property name should match 'role'
                setPhone(response.data.phone_number); // Property name should match 'phone_number'
                setEmail(response.data.user_email); // Property name should match 'user_email'
            }
        } catch (error) {
            console.error(error);
        } finally {
            console.log(false);
        }
    };


    useEffect(() => {
        if (localStorage.token != null) {
            fetchUserData()
        }
    }, [])

    useEffect(() => {
        // This will log the userName value whenever it changes
        console.log("userName:", userName);
    }, [userName]);

    console.log(userName)


    return (
        <>
            <UserContext.Provider
                value={{
                    userId,
                    userName,
                    setUserName,
                    role,
                    setRole,
                    phone,
                    email
                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
};
export default UserProvider;