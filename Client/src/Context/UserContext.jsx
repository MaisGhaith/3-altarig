import axios from "axios";
import React, { useEffect } from "react";
import { Children, createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState();
    const [role, setRole] = useState();
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.get("http://localhost:5151/auth/auth", {
                    headers: {
                        Authorization: token,
                    },
                });

                setUserId(response.data.user_id);
                setUserName(response.data.user_name);
                setRole(response.data.role);


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

    return (
        <>
            <UserContext.Provider
                value={{
                    userId,
                    userName,
                    setUserName,
                    role,
                    setRole
                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
};
export default UserProvider;