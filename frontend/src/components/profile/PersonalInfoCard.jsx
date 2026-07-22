// src/components/profile/PersonalInfoCard.jsx

import {
    Box,
    TextField,
    Typography,
    Stack
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    AtlasButton
} from "../../design-system";

import {
    showSuccessAlert,
    showErrorAlert
} from "../../utils/alerts";

import {
    AtlasCard
} from "../../design-system/components/Card";


const PersonalInfoCard = ({
    user,
    updateProfile
})=>{

    const [form,setForm] =
        useState({
            first_name:"",
            last_name:"",
            email:""
        });

    const [loading,setLoading] =
        useState(false);

    useEffect(()=>{
        if(user){
            setForm({
                first_name:
                    user.first_name || "",
                last_name:
                    user.last_name || "",
                email:
                    user.email || ""
            });
        }
    },[user]);


    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };


    const handleSubmit = async()=>{
        try{
            setLoading(true);
            await updateProfile(
                form
            );
            showSuccessAlert(
                "Perfil actualizado correctamente"
            );
        }catch(error){
            console.error(error);
            showErrorAlert(
                "No fue posible actualizar el perfil"
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
                        mb:3,
                        fontWeight:600
                    }}
                >
                    Información personal
                </Typography>

                <Stack
                    spacing={3}
                >
                    <TextField
                        label="Nombre"
                        name="first_name"
                        value={
                            form.first_name
                        }
                        onChange={
                            handleChange
                        }
                        fullWidth
                    />

                    <TextField
                        label="Apellido"
                        name="last_name"
                        value={
                            form.last_name
                        }
                        onChange={
                            handleChange
                        }
                        fullWidth
                    />

                    <TextField
                        label="Correo electrónico"
                        name="email"
                        value={
                            form.email
                        }
                        onChange={
                            handleChange
                        }
                        fullWidth
                    />
                    <Box
                        sx={{
                            display:"flex",
                            justifyContent:"flex-end"
                        }}
                    >
                        <AtlasButton
                            onClick={
                                handleSubmit
                            }
                            disabled={
                                loading
                            }
                        >
                            {
                                loading
                                ?
                                "Guardando..."
                                :
                                "Guardar cambios"
                            }
                        </AtlasButton>
                    </Box>
                </Stack>
            </Box>
        </AtlasCard>
    );
};


export default PersonalInfoCard;