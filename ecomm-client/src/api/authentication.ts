import axios from "axios";
import { API_BASE_URL } from "./constant"
import type { Credentials } from "./types";

export const login = async (credentials: Credentials) => {
    const url = new URL(API_BASE_URL + "/api/auth/login").toString();

    try {
        const response = await axios.post(url, credentials, {
            withCredentials: true
        })
        return response?.data
    } catch (err) {
        throw new Error((err as Error).message)
        
    }



}