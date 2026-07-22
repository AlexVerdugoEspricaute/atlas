import {
    Box,
    Typography,
    Avatar,
    Stack
} from "@mui/material";

import {
    PersonOutline
} from "@mui/icons-material";

import {
    AtlasCard
} from "../../design-system";


const ProfileHeader = ({
    user
})=>{
    const initials =
        `${user?.first_name?.[0] || ""}
        ${user?.last_name?.[0] || ""}`
        .trim()
        .toUpperCase();

    return (
        <AtlasCard>
            <Stack
                direction={{
                    xs:"column",
                    sm:"row"
                }}
                spacing={3}
                alignItems="center"
            >

                <Avatar
                    sx={{
                        width:90,
                        height:90,
                        fontSize:"2rem"
                    }}
                >
                    {
                        initials ||
                        <PersonOutline/>
                    }
                </Avatar>

                <Box>

                    <Typography
                        variant="h4"
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
                        color="text.secondary"
                    >
                        {
                            user?.email
                        }
                    </Typography>

                    <Typography
                        variant="body2"
                        mt={1}
                    >
                        Perfil de usuario
                    </Typography>

                </Box>
            </Stack>
        </AtlasCard>
    );
};


export default ProfileHeader;