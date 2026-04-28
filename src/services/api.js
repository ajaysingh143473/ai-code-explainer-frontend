import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL
        ? `${process.env.REACT_APP_API_URL}/api`
        : "http://localhost:8080/api"
});

export const explainCode = (data) => API.post("/explain", data);