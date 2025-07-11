// src/api/doctors_api.js
import http from "./http";

export async function listDoctors() {
    const r = await http.get("/doctors");   // GET /api/doctors
    return r.data;                          // [{id, username, …}, …]
}
