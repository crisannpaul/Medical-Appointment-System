import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Navigation from "./components/Navigation";

import Home from "./pages/Home";
// auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// appointment
import AllAppointments from "./pages/appointment/AllAppointments";
import BookAppointment from "./pages/appointment/BookAppointment";
import ViewAppointment from "./pages/appointment/ViewAppointment";
// profile
import AllClients from "./pages/profile/AllClients";
import ViewClient from "./pages/profile/ViewClient";

function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* appointment */}
        <Route path="/all_appointments" element={<AllAppointments/>}/>
        <Route path="/book_appointment" element={<BookAppointment/>}/>
        <Route path="/view_appointment" element={<ViewAppointment/>}/>
        {/* auth */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {/* profile */}
        <Route path="/all_clients" element={<AllClients/>}/>
        <Route path="/view_client" element={<ViewClient/>}/>
      </Routes>
    </Router>
  );
}

export default App;
