import {
    Box,
    Typography,
    Stack
} from "@mui/material";

import {
    useTheme
} from "@mui/material/styles";


import {
    AtlasCard,
} from "@/design-system";

import {
    useAuth
} from "@/store/AuthContext";


export default function WelcomeCard(){

    const theme = useTheme();

    return (
            <AtlasCard
                sx={{
                    position:"relative",
                    overflow:"hidden",
                    minHeight:60,
                    color:"#fff",
                    background:
                    `linear-gradient(
                        120deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.primary.dark}
                    )`,
                    boxShadow:
                    `0 20px 50px
                    ${theme.palette.primary.main}25`
                }}
            >
                <Box
                    sx={{
                        position:"absolute",
                        width:260,
                        height:260,
                        borderRadius:"50%",
                        background:
                        "rgba(255,255,255,.08)",
                        top:-140,
                        right:-80
                    }}
                />
                <Stack
                    direction={{
                        xs:"column",
                        md:"row"
                    }}
                    spacing={3}
                    sx={{
                        position:"relative",
                        zIndex:1,
                        justifyContent:"space-between",
                        alignItems:{
                            xs:"flex-start",
                            md:"center"
                        }
                    }}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                mt:0.5,
                                opacity:.85
                            }}
                        >
                            Panel central de gestión
                            y administración de ATLAS.
                        </Typography>
                    </Box>
                </Stack>
            </AtlasCard>
    );
};
