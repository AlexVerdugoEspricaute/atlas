// src/services/users.service.js

const API = import.meta.env.VITE_API_URL;


export const getMyProfile = async(token)=>{
    const res =
        await fetch(
            `${API}/api/v1/users/me`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
    if(!res.ok){
        throw await res.json();
    }
    return res.json();
};


export const updateMyProfile = async(token,data)=>{
    const res =
        await fetch(
            `${API}/api/v1/users/me`,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(data)
            }
        );
    if(!res.ok){
        throw await res.json();
    }
    return res.json();
};