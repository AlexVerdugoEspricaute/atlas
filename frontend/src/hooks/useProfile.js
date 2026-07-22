/// src/hooks/useProfile.js

import { useEffect, useState } from "react";

import {
    getMyProfile,
    updateMyProfile
} from "../services/users.service";


const useProfile = (token)=>{
    const [profile,setProfile] =
        useState(null);
    const [loading,setLoading] =
        useState(true);
    const [error,setError] =
        useState(null);

    const loadProfile = async()=>{
        try{
            setLoading(true);
            const response =
                await getMyProfile(token);
            setProfile(
                response.user
            );
        }catch(error){
            setError(error);
        }finally{
            setLoading(false);
        }
    };


    const updateProfile = async(data)=>{
        try{
            const response =
                await updateMyProfile(
                    token,
                    data
                );
            setProfile(
                response.user
            );
            return response;
        }catch(error){
            throw error;
        }
    };
    useEffect(()=>{
        if(token){
            loadProfile();
        }
    },[token]);
    return {
        profile,
        loading,
        error,
        reloadProfile:loadProfile,
        updateProfile
    };
};


export default useProfile;