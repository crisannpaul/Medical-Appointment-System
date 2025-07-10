// src/api/doctors_api.js
import { http } from "./api";          // ← your existing axios instance

export async function listDoctors() {
    const r = await http.get("/api/doctors");   // GET /api/doctors
    return r.data;                          // [{id, username, …}, …]
}
