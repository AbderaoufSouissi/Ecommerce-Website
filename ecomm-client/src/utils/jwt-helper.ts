import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  exp: number
}

export const isTokenValid = ()=> {
  const token = localStorage.getItem("jwtToken")
  if (!token) return false

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch (error) {
    console.error("Invalid Token", error)
    return false
  }
}



export const saveToken = (token: string) => {
    localStorage.setItem("jwtToken", token)
    
}

export const logout = () => {
    localStorage.clear()
}