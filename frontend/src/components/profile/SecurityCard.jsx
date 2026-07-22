// src/components/profile/SecurityCard.jsx

import {
    Box,
    Chip,
    Divider,
    Typography
} from "@mui/material";

import {
    AtlasCard
} from "../../design-system/components/Card";


const SecurityCard = ({
    user
})=>{
    const isMicrosoft =
        user.provider === "microsoft";

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
                    Seguridad
                </Typography>

                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        gap:2
                    }}
                >

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Método de acceso
                        </Typography>

                        <Chip
                            sx={{
                                mt:1
                            }}
                            label={
                                isMicrosoft
                                ?
                                "Microsoft Entra ID"
                                :
                                "Correo y contraseña"
                            }
                        />
                    </Box>

                    <Divider />

                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Estado de cuenta
                        </Typography>

                        <Chip
                            sx={{
                                mt:1
                            }}
                            color={
                                user.is_active
                                ?
                                "success"
                                :
                                "error"
                            }
                            label={
                                user.is_active
                                ?
                                "Activo"
                                :
                                "Desactivado"
                            }
                        />
                    </Box>
                    {
                        !isMicrosoft &&
                        (
                            <Box
                                sx={{
                                    mt:2
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Cambio de contraseña
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt:1
                                    }}
                                >
                                    Próximamente podrás actualizar tu contraseña desde esta sección.
                                </Typography>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </AtlasCard>
    );
};


export default SecurityCard;