import axios from "axios";

const BASE_PATH = "http://localhost:8080";
// const BASE_PATH = "https://backend-lhm.herokuapp.com";

export const http = axios.create({
    baseURL: BASE_PATH,
    withCredentials: true,
});

http.interceptors.response.use(
    (resp) => resp,
    (err)  => {
        // global 401 handler, log, etc.
        return Promise.reject(err);
    }
);
