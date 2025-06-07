import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://localhost:8080/api/auth";
export const fetchUserDetails = async ()=>{
    const url = API_BASE_URL + '/profile';
    try{
        const response = await axiosInstance(url,{
            method:"GET",
        });
        return response?.data;
    }
    catch(err){
        throw new Error(err);
    }
}