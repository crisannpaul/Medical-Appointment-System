import axios from "axios";

// const BASE_PATH = "http://localhost:8080";
const BASE_PATH = "https://backend-lhm.herokuapp.com";

export const API = axios.create({baseURL: BASE_PATH});
