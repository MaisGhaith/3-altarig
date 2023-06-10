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
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Confirm from './Components/Confirm'
function App() {
  return (

    <Router>
      {/* <Nav /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="LoginForm" element={<LoginForm />} />
        <Route path="RegisterForm" element={<RegisterForm />} />
        <Route path="Confirm" element={<Confirm />} />

      </Routes>

    </Router>
  );
}

export default App;
