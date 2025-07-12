// src/components/AvailabilityChecker.jsx
import React, { useEffect, useState } from "react";
import DoctorDateTimePicker from "./DoctorDateTimePicker";
import { isSlotFree } from "../api/availability_api";
import { formatISO } from "date-fns";

const AvailabilityChecker = () => {
    const [doctorId, setDoctor] = useState(null);
    const [dateTime, setDate]   = useState(null);
    const [available, setAvail] = useState(null);  // null | true | false
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!doctorId || !dateTime) return;

        setLoading(true);
        isSlotFree(doctorId, formatISO(dateTime))
            .then(ok => setAvail(ok))
            .catch(() => setAvail(null))
            .finally(() => setLoading(false));
    }, [doctorId, dateTime]);

    return (
        <section style={{ marginTop: 32 }}>
            <h2>Check Appointment Availability</h2>

            <DoctorDateTimePicker
                doctorId={doctorId}
                dateTime={dateTime}
                onDoctor={setDoctor}
                onDate={setDate}
            />

            {loading && <p>Checking…</p>}
            {available !== null && !loading && (
                <p style={{ color: available ? "green" : "red", fontWeight: "bold" }}>
                    {available ? "Slot is FREE ✔" : "Slot is already booked ✖"}
                </p>
            )}
        </section>
    );
};

export default AvailabilityChecker;
