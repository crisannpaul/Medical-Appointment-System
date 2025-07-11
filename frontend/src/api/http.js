import axios from "axios";

const BASE_PATH = "http://localhost:8080";
// const BASE_PATH = "https://backend-lhm.herokuapp.com";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
});

// attach a saved JWT (if any)
const token = localStorage.getItem("jwt");
if (token) http.defaults.headers.common.Authorization = `Bearer ${token}`;

/* 401 ⇒ auto-logout */
http.interceptors.response.use(
    (resp) => resp,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("jwt");
            delete http.defaults.headers.common.Authorization;
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default http;
