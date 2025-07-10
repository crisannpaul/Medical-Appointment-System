// src/components/AvailabilityChecker.js
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { listDoctors } from "../api/doctors_api";
import { isSlotFree } from "../api/availability_api";
import { formatISO } from "date-fns";

const AvailabilityChecker = () => {
    /* ---------- state ---------- */
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const [dateTime, setDateTime] = useState(null);
    const [result, setResult] = useState(null);          // null | true | false
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* ---------- load doctor list on mount ---------- */
    useEffect(() => {
        listDoctors()
            .then(setDoctors)
            .catch(() => setError("Could not fetch doctors"));
    }, []);

    /* ---------- when doctor or date changes → ping backend ---------- */
    useEffect(() => {
        if (!doctorId || !dateTime) return;

        setLoading(true);
        setResult(null);
        isSlotFree(doctorId, formatISO(dateTime))
            .then((avail) => setResult(avail))
            .catch(() => setError("Server error"))
            .finally(() => setLoading(false));
    }, [doctorId, dateTime]);

    /* ---------- render ---------- */
    return (
        <section style={{ marginTop: 32 }}>
            <h2>Check Appointment Availability</h2>

            {/* doctor dropdown */}
            <label>
                Doctor:&nbsp;
                <select
                    value={doctorId ?? ""}
                    onChange={(e) => setDoctorId(Number(e.target.value))}
                >
                    <option value="" disabled>
                        -- Choose a doctor --
                    </option>
                    {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.username}
                        </option>
                    ))}
                </select>
            </label>

            {/* date-time picker (inline calendar) */}
            <div style={{ marginTop: 16 }}>
                <DatePicker
                    selected={dateTime}
                    onChange={(dt) => setDateTime(dt)}
                    showTimeSelect
                    inline
                    timeIntervals={30}
                    dateFormat="PPpp"
                    placeholderText="Pick date & time"
                />
            </div>

            {/* status */}
            {loading && <p>Checking…</p>}
            {result !== null && !loading && (
                <p style={{ color: result ? "green" : "red", fontWeight: "bold" }}>
                    {result ? "Slot is FREE ✔" : "Slot is already booked ✖"}
                </p>
            )}

            {error && <p style={{ color: "crimson" }}>{error}</p>}
        </section>
    );
};

export default AvailabilityChecker;
