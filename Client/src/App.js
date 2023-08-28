import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import AboutUs from './Components/AboutUs';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Confirm from './Components/Confirm';
import Profile from './Components/Profile';
import Landing from './Components/Landing';
import React, { useContext } from 'react';
import ProfileFunctions from './Components/ProfileFunctions';
import NotFound from './Components/NotFound';
import { UserContext } from './Context/UserContext';
import Footer from './Components/Footer';
import ForgetPassword from './Components/ForgetPassword';
import DetailsChoices from './Components/DetailsChoices';
function App() {
  const { role } = useContext(UserContext);

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
            <Route path="DetailsChoices" element={<DetailsChoices />} />
            <Route path="ProfileFunctions" element={<ProfileFunctions />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}

      {role == undefined && (
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
            <Route path="ForgetPassword" element={<ForgetPassword />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      )}


    </div>
  );
}

export default App;
