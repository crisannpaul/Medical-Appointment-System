import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BookAppointment from "./pages/appointment/BookAppointment";
import MyAppointments from "./pages/appointment/MyAppointments";
import ViewClient from "./pages/profile/ViewClient";

const App = () => {
  return (
    <Router>
      <Navigation/>
      <div style={{margin: 40, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{width: 750}}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            {/* appointment */}
            <Route path="/my_appointments" element={<MyAppointments/>}/>
            <Route path="/book_appointment" element={<BookAppointment/>}/>
            {/* auth */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            {/* profile */}
            <Route path="/view_client" element={<ViewClient/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;