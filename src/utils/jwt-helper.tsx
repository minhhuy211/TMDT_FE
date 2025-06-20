import { jwtDecode } from "jwt-decode";


interface JwtPayload {
    exp: number;
    [key: string]: any;
}
export const isTokenValid = ()=>{

    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded:JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log("Token", token);
        // Check if the token is expired
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Invalid token", error);
        return false;
    }
}