import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth_api";

const Login = () => {
    const nav = useNavigate();
    const [username, setU] = useState("");
    const [password, setP] = useState("");
    const [err, setErr] = useState("");

    async function submit(e) {
        e.preventDefault();
        setErr("");
        try {
            await login(username, password);
            console.log("succ");
            // nav("/");                         // go home
        } catch {
            setErr("Invalid username or password");
        }
    }

    return (
        <form onSubmit={submit} style={{ maxWidth: 400, margin: "auto" }}>
            <h2>Sign in</h2>

            <label>
                Username
                <input
                    value={username}
                    onChange={(e) => setU(e.target.value)}
                    required
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={password}
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
