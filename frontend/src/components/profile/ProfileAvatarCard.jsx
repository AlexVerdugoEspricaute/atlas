// src/components/profile/ProfileAvatarCard.jsx

import {
    Avatar,
    Box,
    Chip,
    Typography
} from "@mui/material";

import {
    AtlasCard
} from "../../design-system/components/Card";


const ProfileAvatarCard = ({
    user
})=>{
    const getInitials = ()=>{

        const first =
            user?.first_name
            ?.charAt(0)
            || "";

        const last =
            user?.last_name
            ?.charAt(0)
            || "";

        return (
            first +
            last
        ).toUpperCase();
    };

    return (
        <AtlasCard>

            <Box
                sx={{
                    p:3,
                    display:"flex",
                    alignItems:"center",
                    gap:3
                }}
            >

                <Avatar
                    sx={{
                        width:90,
                        height:90,
                        fontSize:32,
                        fontWeight:700
                    }}
                >
                    {
                        getInitials()
                    }
                </Avatar>

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        {
                            user?.first_name
                        }
                        {" "}
                        {
                            user?.last_name
                        }
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt:0.5
                        }}
                    >
                        {
                            user?.email
                        }
                    </Typography>

                    <Chip
                        sx={{
                            mt:2
                        }}
                        size="small"
                        label={
                            user?.is_active
                            ?
                            "Cuenta activa"
                            :
                            "Cuenta desactivada"
                        }
                        color={
                            user?.is_active
                            ?
                            "success"
                            :
                            "error"
                        }
                    />
                </Box>
            </Box>
        </AtlasCard>
    );
};


export default ProfileAvatarCard;