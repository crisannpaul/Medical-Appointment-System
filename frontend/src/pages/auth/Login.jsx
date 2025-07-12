import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { login as apiLogin } from "../../api/auth_api";
import {useAuth} from "../../auth/AuthContext";

const Login = () => {
    const nav = useNavigate();
    const loc = useLocation();
    const { login, homeForRole } = useAuth();

    const [u, setU] = useState("");
    const [p, setP] = useState("");
    const [err, setErr] = useState("");

    async function submit(e) {
        e.preventDefault();
        setErr("");
        try {
            const tok = await apiLogin(u, p);   // modify auth_api below
            login(tok);

            // redirect: back to intended page OR role home
            const dest = loc.state?.from?.pathname || homeForRole(jwtDecode(tok).role);
            nav(dest, { replace: true });
        } catch {
            setErr("Invalid credentials");
        }
    }

    return (
        <form onSubmit={submit} style={{ maxWidth: 400, margin: "auto" }}>
            <h2>Sign in</h2>

            <label>
                Username
                <input
                    value={u}
                    onChange={(e) => setU(e.target.value)}
                    required
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={p}
                    onChange={(e) => setP(e.target.value)}
                    required
                />
            </label>

            <button type="submit" style={{ marginTop: 16 }}>Login</button>
            {err && <p style={{ color: "crimson" }}>{err}</p>}
        </form>
    );
};

export default Login;
