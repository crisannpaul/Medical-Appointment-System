// src/api/appointments_api.js
import http from "./http";

export async function bookAppointment(dto) {
    const res = await http.post("/appointments", dto);   // { doctorId, clientId, startAt }
    return res.data;
}

export async function quickBook({ doctorId, clientName, clientPhone, startAt }) {
    await http.post("/appointments/book", {
        doctorId,
        clientName,
        clientPhone,
        startAt     // ISO string already from formatISO
    });
}

export async function listClients() {
    const res = await http.get("/clients");              // adjust if you add search
    return res.data;                                     // [{id, username, ...}]
}
