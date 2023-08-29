import { useContext, useEffect, useState } from 'react'
import '../../src/App.css'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default () => {

    const { userId, userName, setUserName } = useContext(UserContext);

    const [state, setState] = useState(false)

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "الرئيسية", path: "/Landing" },
        // { title: "خدماتنا", path: window.location = '' },
        { title: "معلومات", path: "/Landing" },
        { title: "من نحن", path: "/AboutUs" },
        { title: "اتصل بنا", path: "/ContactUs" },
    ];


    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])

    useEffect(() => {
        const nav = document.getElementById("stickyNav");
        const stickyClass = "sticky-nav";

        const handleScroll = () => {
            if (window.pageYOffset > nav.offsetTop) {
                nav.classList.add(stickyClass);
            } else {
                nav.classList.remove(stickyClass);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navigate = useNavigate();
    const whatever = (path) => {
        navigate(`/${path}`)
    }
    const isLoggedIn = !!userName;

    useEffect(() => {
        if (isLoggedIn) {
            // Execute code when user is logged in
            // For example, fetch user data and set userName
            // ...
        }
    }, [isLoggedIn]);


    const [isLoggedOut, setIsLoggedOut] = useState(false);
    useEffect(() => {
        if (isLoggedOut) {
            setUserName('');
            setIsLoggedOut(false);
        }
    }, [isLoggedOut]);

    const handleLogIn = async () => {

        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.get(`http://localhost:5151/getUser/${userId}`);
                const userData = response.data
                setUserName(userData.user_name)
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    const handleLogout = () => {
        // Clear localStorage
        localStorage.clear();

        // Set isLoggedOut to true
        setIsLoggedOut(true);

        // Redirect to Landing page
        navigate('/Landing');
    };

    return (
        <div>

            <nav
                id="stickyNav"
                className={`absolute bg-gradient-to-t from-black/30 to-yellow-300/90 top-0 z-10 left-0 right-0 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""
                    }`}
            // style={{ backgroundColor: "rgba(0, 0, 0, 0.422)" }}
            >
                <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                    <div className="flex items-center justify-between py-2 md:block">
                        <Link to="/Landing">
                            <img
                                src="/Images/logoo.png"
                                width={80}
                                height={50}
                                alt="3-altarig logo"
                            />
                        </Link>
                        <div className="md:hidden">
                            <button className="menu-btn text-white"
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                        <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-x-reverse md:space-y-0">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="text-white hover:scale-105">
                                        <Link to={item.path} className="block">
                                            {item.title}
                                        </Link>
                                    </li>
                                ))

                            }
                        </ul>
                        <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/Profile" className="block text-white hover:scale-105">
                                        اهلا، {userName} !
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                                    >
                                        تسجيل الخروج
                                        <FontAwesomeIcon className='mx-1 mt-1' icon={faArrowRight} rotation={180} style={{ color: "#ffffff", }} />

                                    </button>
                                </>
                            ) : (
                                <Link
                                    onClick={handleLogIn}
                                    to="/LoginForm"
                                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                                >
                                    التسجيل
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}