// src/pages/Home.js   (or wherever the file lives)
import React from "react";
import ContactInfo from "../components/ContactInfo";
import AvailabilityChecker from "../components/AvailabilityChecker";

const Home = () => (
    <div>
        <h1>Kio Energy SRL</h1>
        <ContactInfo />
        <AvailabilityChecker/>
    </div>
);

export default Home;
