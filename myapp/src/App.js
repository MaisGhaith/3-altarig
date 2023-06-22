// import logo from './logo.svg';
import './App.css';
// import Nav from './component/Nav';
// import LoginForm from './component/LoginForm';
// import RegisterForm from './component/RegisterForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import Appointment from './component/Appointment';
// import Confirm from './component/Confirm';
// import DropImage from './component/DropImage';
// import GoogleMapReact from './component/GoogleMapReact';
// import ContactUs from './component/ContactUs';
import AboutUs from './Components/AboutUs';
// import Home from './Components/Home';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Confirm from './Components/Confirm'
import Profile from './Components/Profile';
// import Services from './Components/Services';
import Landing from './Components/Landing';
function App() {
  return (

    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="LoginForm" element={<LoginForm />} />
        <Route path="RegisterForm" element={<RegisterForm />} />
        <Route path="Confirm" element={<Confirm />} />
        <Route path="Profile" element={<Profile />} />
        {/* <Route path="Services" element={<Services />} /> */}


      </Routes>

    </Router>
  );
}

export default App;
