// src/api/authApi.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

export const register = async (data: {
    username: string;
    email: string;
    password: string;
}) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
};

export const login = async (data: {
    email: string;
    password: string;
}) => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    const token = response.data.result.token;
    localStorage.setItem("token", token);
    return token;
};
