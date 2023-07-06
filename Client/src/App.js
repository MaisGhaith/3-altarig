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
import React, { useEffect, useState, useReducer } from 'react';
import ProfileFunctions from './Components/ProfileFunctions';
import NotFound from './Components/NotFound';
// import Map from './Components/Map';
function App({ userName }) {

  // const navigate = useNavigate();

  const [id, setId] = useState("");
  const [role, setRole] = useState("guest")
  // const [userType, setUserType] = useState("guest");
  // const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

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
          <Navbar userName={userName} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route path="LoginForm" element={<LoginForm />} />
            <Route path="RegisterForm" element={<RegisterForm />} />
            <Route path="Confirm" element={<Confirm />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="ProfileFunctions" element={<ProfileFunctions />} />
            {/* <Route path="Map" element={<Map />} /> */}
          </Routes>
        </BrowserRouter>
      )}

      {role == "guest" && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route path="LoginForm" element={<LoginForm />} />
            <Route path="RegisterForm" element={<RegisterForm />} />
            <Route path="Confirm" element={<Confirm />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      )}
      {/* <Router>
        <Navbar userName={userName} />
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route path="LoginForm" element={<LoginForm />} />
            <Route path="RegisterForm" element={<RegisterForm />} />
            <Route path="Confirm" element={<Confirm />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="ProfileFunctions" element={<ProfileFunctions />} />
            <Route path="NotFound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router> */}
    </div>
  );
}

export default App;
