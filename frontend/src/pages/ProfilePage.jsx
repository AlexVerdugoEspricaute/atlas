/// src/pages/ProfilePage.jsx

import {
    Box,
    CircularProgress,
    Typography
} from "@mui/material";


import { useContext } from "react";

import { useAuth } from "../store/AuthContext";

import useProfile from "../hooks/useProfile";

import ProfileHeader
    from "../components/profile/ProfileHeader";

import ProfileAvatarCard
    from "../components/profile/ProfileAvatarCard";

import PersonalInfoCard
    from "../components/profile/PersonalInfoCard";

import SecurityCard
    from "../components/profile/SecurityCard";

import AccountCard
    from "../components/profile/AccountCard";

import PageContainer
    from "../components/layout/PageContainer";



const ProfilePage = ()=>{

    const {
        token
    } = useAuth();

    const {
        profile,
        loading,
        error,
        updateProfile
    } =
    useProfile(token);

    if(loading){
        return (
            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    height:"70vh"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if(error){
        return (
            <Box>
                <Typography
                    color="error"
                >
                    Error cargando perfil
                </Typography>
            </Box>
        );
    }
    if(!profile){
        return null;
    }

    return (
        <PageContainer>
            <ProfileHeader
                user={profile}
            />
            <Box
                sx={{
                    display:"grid",
                    gridTemplateColumns:{
                        xs:"1fr",
                        md:"350px 1fr"
                    },
                    gap:3,
                    mt:3
                }}
            >
                <Box>
                    <ProfileAvatarCard
                        user={profile}
                    />
                </Box>
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        gap:3
                    }}
                >
                    <PersonalInfoCard
                        user={profile}
                        updateProfile={
                            updateProfile
                        }
                    />
                    <SecurityCard
                        user={profile}
                    />
                    <AccountCard
                        user={profile}
                    />
                </Box>
            </Box>
        </PageContainer>
    );
};


export default ProfilePage;