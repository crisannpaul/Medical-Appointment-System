import React, { useEffect, useState } from "react";
import { formatISO } from "date-fns";
import DoctorDateTimePicker from "../components/DoctorDateTimePicker";
import {listClients, quickBook} from "../api/appointments_api";
import { bookAppointment } from "../api/appointments_api";
import { isSlotFree } from "../api/availability_api";
import { useNavigate } from "react-router-dom";

const ReceptionistBookingPage = () => {
    const nav = useNavigate();
    const [clientName,  setClientName]  = useState("");
    const [clientPhone, setClientPhone] = useState("");

    const [doctorId, setDoctor] = useState(null);
    const [dateTime, setDate]   = useState(null);

    const [checking, setChecking] = useState(false);
    const [slotFree, setSlotFree] = useState(null);   // null|true|false
    const [saving, setSaving]     = useState(false);
    const [msg, setMsg]           = useState("");

    /* load clients once */
    // useEffect(() => {
    //     listClients().then(setClients);
    // }, []);

    /* auto-check slot every time selection changes */
    useEffect(() => {
        if (!doctorId || !dateTime) return;
        setChecking(true);
        isSlotFree(doctorId, formatISO(dateTime))
            .then(free => setSlotFree(free))
            .finally(() => setChecking(false));
    }, [doctorId, dateTime]);

    async function submit(e) {
        e.preventDefault();
        if (!slotFree) { setMsg("Slot not free"); return; }

        setSaving(true);
        try {
            await quickBook({
                doctorId,
                clientName,
                clientPhone,
                startAt: formatISO(dateTime)
            });
            nav("/my_appointments?success=1");
        } catch (err) {
            setMsg(err.response?.data || "Server error");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={submit} style={{ maxWidth: 600, margin: "auto" }}>
            <h2>Book Appointment for Client</h2>

            {/* client dropdown */}
            <label>
                Client name
                <input value={clientName} onChange={e=>setClientName(e.target.value)} required />
            </label>
            <label>
                Phone
                <input value={clientPhone} onChange={e=>setClientPhone(e.target.value)} required />
            </label>

            {/* doctor + date/time picker reused */}
            <DoctorDateTimePicker
                doctorId={doctorId}
                dateTime={dateTime}
                onDoctor={setDoctor}
                onDate={setDate}
            />

            {/* availability info */}
            {checking && <p>Re-checking slot…</p>}
            {slotFree === false && <p style={{color:"red"}}>Slot already booked</p>}
            {slotFree === true  && <p style={{color:"green"}}>Slot free</p>}

            <button type="submit" disabled={!slotFree || saving}>
                {saving ? "Saving…" : "Book"}
            </button>

            {msg && <p style={{ color:"crimson" }}>{msg}</p>}
        </form>
    );
};

export default ReceptionistBookingPage;
