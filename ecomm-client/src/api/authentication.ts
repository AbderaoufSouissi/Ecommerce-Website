import axios from "axios";
import { API_BASE_URL } from "./constant"

export interface LoginCredentials{
  username: string,
  password: string
}


export interface SignUpCredentials{
    firstName: string
    lastName: string
    email: string,
    phoneNumber: string
    password: string
}

export interface VerifyRequest{
    username: string
    code: string
}




export const login = async (credentials: LoginCredentials) => {
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



export const register = async (credentials: SignUpCredentials) => {
    const url = new URL(API_BASE_URL + "/api/auth/register").toString();

    try {
        const response = await axios.post(url,credentials);
        return response?.data
        
    } catch (err) {
        throw new Error((err as Error).message)

        
    }
    
}


export const verify = async (body: VerifyRequest) => {
    const url = new URL(API_BASE_URL + "/api/auth/verify").toString()
    try {
        const response = await axios.post(url, body);
        return response?.data
    }catch (err) {
        throw new Error((err as Error).message)

        
    }
}