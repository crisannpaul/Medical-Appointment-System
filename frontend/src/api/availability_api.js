// src/api/availability_api.js
import http from "./http";

export async function isSlotFree(doctorId, isoDateTime) {
    const r = await http.get("/appointments/available", {
        params: { doctorId, dateTime: isoDateTime },
    });

    // console.log(isoDateTime);
    // backend returns { available: true/false }
    return r.data.available;
}