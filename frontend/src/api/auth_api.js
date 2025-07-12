import {jwtDecode} from "jwt-decode";
import http from "./http";

/* ---------- login / logout ---------- */
export async function login(username, password) {
    const res = await http.post("/auth/login", { username, password });
    return res.data.token;         // just return token, context handles storage
}

export function logout() {
    localStorage.removeItem("jwt");
    delete http.defaults.headers.common.Authorization;
}

/* ---------- helpers ---------- */
export function getDecodedToken() {
    const tok = localStorage.getItem("jwt");
    if (!tok) return null;

    try {
        const data = jwtDecode(tok);
        if (data.exp * 1000 < Date.now()) {
            logout();
            return null;
        }
        return data;              // { username, role, exp, … }
    } catch {
        logout();
        return null;
    }
}

export function isLoggedIn() {
    return !!getDecodedToken();
}
