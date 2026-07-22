// src/components/profile/AccountCard.jsx

import {
    Box,
    Divider,
    Typography
} from "@mui/material";


import {
    AtlasCard
} from "../../design-system/components/Card";


import {
    AtlasButton
} from "../../design-system";

import {
    showSuccessAlert,
    showErrorAlert
} from "../../utils/alerts";

import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useContext
} from "react";

import {
    AuthContext
} from "../../store/AuthContext";


const AccountCard = ({
    user
})=>{
    const [loading,setLoading] =
        useState(false);

    const navigate =
        useNavigate();

    const {
        token,
        logout
    } =
    useContext(
        AuthContext
    );

    const deactivateAccount = async()=>{
        try{
            setLoading(true);

            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v1/users/${user.id}`,
                    {
                        method:"DELETE",
                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );
            if(!response.ok){
                throw new Error(
                    "No fue posible desactivar la cuenta"
                );
            }
            showSuccessAlert(
                "Cuenta desactivada correctamente"
            );
            setTimeout(()=>{
                logout();
                navigate(
                    "/login"
                );
            },1500);
        }catch(error){
            console.error(error);
            showErrorAlert(
                error.message
            );
        }finally{
            setLoading(false);
        }
    };

    return (
        <AtlasCard>
            <Box
                sx={{
                    p:3
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb:2,
                        fontWeight:600
                    }}
                >
                    Cuenta
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Gestiona las acciones relacionadas con tu cuenta.
                </Typography>

                <Divider
                    sx={{
                        my:3
                    }}
                />

                <Box
                    sx={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        gap:2
                    }}
                >

                    <Box>

                        <Typography
                            fontWeight={600}
                        >
                            Desactivar cuenta
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Tu información será conservada pero no podrás iniciar sesión hasta reactivar la cuenta.
                        </Typography>

                    </Box>

                    <AtlasButton
                        disabled={
                            loading
                        }
                        onClick={
                            deactivateAccount
                        }
                    >
                        {
                            loading
                            ?
                            "Desactivando..."
                            :
                            "Desactivar"
                        }
                    </AtlasButton>
                </Box>
            </Box>
        </AtlasCard>
    );
};


export default AccountCard;