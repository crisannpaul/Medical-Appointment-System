// src/routes/RequireAuth.tsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../api/auth_api";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
}
