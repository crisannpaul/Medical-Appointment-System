import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import {RequireAuth} from "./auth/RequireAuth";
import ReceptionistBookingPage from "./pages/ReceptionistBookingPage";
import {RequireRole} from "./auth/RequireRole";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import BookAppointment from "./pages/appointment/BookAppointment";
// import MyAppointments from "./pages/appointment/MyAppointments";
// import ViewClient from "./pages/profile/ViewClient";

const App = () => {
  return (
    <Router>
      <Navigation/>
      <div style={{margin: 40, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{width: 750}}>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home/>}/>
              <Route
                  path="/recept/book"
                  element={
                      <RequireAuth>
                          <RequireRole role="RECEPTIONIST">
                              <ReceptionistBookingPage />
                          </RequireRole>
                      </RequireAuth>
                  }
              />
              {/* appointment */}
            {/*<Route path="/my_appointments" element={<MyAppointments/>}/>*/}
            {/*<Route path="/book_appointment" element={<BookAppointment/>}/>*/}
            {/* auth */}
            {/*<Route path="/login" element={<Login/>}/>*/}
            {/*<Route path="/register" element={<Register/>}/>*/}
            {/* profile */}
            {/*<Route path="/view_client" element={<ViewClient/>}/>*/}
            {/*  <Route path="*" element={<NotFound />} />*/}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;