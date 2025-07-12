// src/components/DoctorDateTimePicker.jsx
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { listDoctors } from "../api/doctors_api";

const DoctorDateTimePicker = ({ doctorId, dateTime, onDoctor, onDate }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        listDoctors().then(setDoctors).catch(() => setDoctors([]));
    }, []);

    return (
        <>
            {/* doctor dropdown */}
            <label>
                Doctor:&nbsp;
                <select value={doctorId ?? ""} onChange={e => onDoctor(Number(e.target.value))}>
                    <option value="" disabled>-- Choose a doctor --</option>
                    {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.username}</option>
                    ))}
                </select>
            </label>

            {/* date-time inline calendar */}
            <div style={{ marginTop: 16 }}>
                <DatePicker
                    selected={dateTime}
                    onChange={onDate}
                    showTimeSelect
                    inline
                    timeIntervals={30}
                    dateFormat="PPpp"
                />
            </div>
        </>
    );
};

export default DoctorDateTimePicker;
