import axios from "axios";
const API_URL='https://10.12.73.116:3000/api/tokens'; //or replace with your IP address when testing on pnysical device

export const generateToken= async (amount,meter_number)=>{
    try{
        const response=await axios.post(`${API_URL}/generate`,{
            amount,
            meter_number
        });
        return response.data;
    }catch(error){
        throw error.response?.data?.error || 'Network error';
    }
        
    }


export const validateTokens= async (meter_number)=>{
    try{
        const response=await axios.get(`${API_URL}/validate/${meter_number}`);
            return response.data;
        
    }catch(error){
        throw error.response?.data?.error || 'Network error';
    }
        
    }
