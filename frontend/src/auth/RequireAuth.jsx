import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ children }) => {
    const { user } = useAuth();
    const loc = useLocation();
    return user ? children : <Navigate to="/login" state={{ from: loc }} replace />;
};