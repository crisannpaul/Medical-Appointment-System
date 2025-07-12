import React, { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import http from "../api/http";

const AuthCtx = createContext();

const ROLE_HOME = {
    RECEPTIONIST: "/recept/book",
    ADMIN:        "/admin",
};

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [user,  setUser]  = useState(null);    // { username, role, exp … }

    /* decode token on load / change */
    useEffect(() => {
        if (!token) { setUser(null); return; }
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) throw new Error("expired");
            setUser(decoded);
            http.defaults.headers.common.Authorization = `Bearer ${token}`;
        } catch {
            logout();
        }
    }, [token]);

    /* helpers */
    const login = (tok) => {
        localStorage.setItem("jwt", tok);
        setToken(tok);
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        delete http.defaults.headers.common.Authorization;
        setToken(null);
    };

    /* where to redirect after login */
    const homeForRole = (role) => ROLE_HOME[role] || "/";

    return (
        <AuthCtx.Provider value={{ user, role: user?.role, login, logout, homeForRole }}>
            {children}
        </AuthCtx.Provider>
    );
}

export const useAuth = () => useContext(AuthCtx);
