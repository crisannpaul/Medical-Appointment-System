import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireRole = ({ role, children }) => {
    const { role: myRole } = useAuth();
    return myRole === role ? children : <Navigate to="/" replace />;
};