import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import AboutUs from './Components/AboutUs';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Confirm from './Components/Confirm';
import Profile from './Components/Profile';
import Landing from './Components/Landing';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState, useReducer, useContext } from 'react';
import ProfileFunctions from './Components/ProfileFunctions';
import NotFound from './Components/NotFound';
import { UserContext } from './Context/UserContext';
import Footer from './Components/Footer';

function App() {
  // const { role , setRole} = useContext(UserContext);
  const { userId, userName } = useContext(UserContext);

  console.log(userName, userId)
  // const navigate = useNavigate();

  const [id, setId] = useState("");
  const [role, setRole] = useState("guest")

  useEffect(() => {
    const getUserNameFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        const id1 = decodedToken.user_id;
        const role = decodedToken.role;
        setId(id1);
        setRole(role);

        // console.log(id1, role);
      }
    };

    getUserNameFromToken();
  }, []);



  return (
    <div>

      {role === "user" && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="Landing" element={<Landing />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route path="LoginForm" element={<LoginForm />} />
            <Route path="RegisterForm" element={<RegisterForm />} />
            <Route path="Confirm" element={<Confirm />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="ProfileFunctions" element={<ProfileFunctions />} />
            {/* <Route path="Map" element={<Map />} /> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      )}

      {role == "guest" && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/Landing" element={<Landing />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route path="LoginForm" element={<LoginForm />} />
            <Route path="RegisterForm" element={<RegisterForm />} />
            <Route path="Confirm" element={<Confirm />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
