import {
    Box,
    Typography,
    Avatar,
    Stack
} from "@mui/material";

import {
    useTheme
} from "@mui/material/styles";

import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import {
    AtlasCard,
    MouseGlow
} from "@/design-system";

import {
    useAuth
} from "@/store/AuthContext";


export default function WelcomeCard(){
    const theme = useTheme();

    const { user } = useAuth();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
        ? "Buenos días"
        : hour < 18
        ? "Buenas tardes"
        : "Buenas noches";


    const date =
        new Date()
        .toLocaleDateString(
            "es-ES",
            {
                weekday:"long",
                day:"numeric",
                month:"long",
                year:"numeric"
            }
        );

    return (
        <MouseGlow>
            <AtlasCard
                sx={{
                    position:"relative",
                    overflow:"hidden",
                    minHeight:240,
                    color:"#fff",
                    background:
                    `linear-gradient(
                        120deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.primary.dark}
                    )`,
                    boxShadow:
                    `0 25px 70px
                    ${theme.palette.primary.main}30`
                }}
            >

                <Box
                    sx={{
                        position:"absolute",
                        width:320,
                        height:320,
                        borderRadius:"50%",
                        background:
                        "rgba(255,255,255,.08)",
                        top:-150,
                        right:-100
                    }}
                />

                <Box
                    sx={{
                        position:"absolute",
                        width:180,
                        height:180,
                        borderRadius:"50%",
                        background:
                        "rgba(255,255,255,.05)",
                        bottom:-90,
                        left:280
                    }}
                />

                <Stack
                    direction={{
                        xs:"column",
                        md:"row"
                    }}
                    gap={3}
                    sx={{
                        justifyContent:"space-between",
                        alignItems:{
                            xs:"flex-start",
                            md:"center"
                        },
                        position:"relative",
                        zIndex:1
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            fontWeight={900}
                            sx={{
                                mb:1,
                                letterSpacing:"-0.04em"
                            }}
                        >
                            {greeting},{" "}
                            {user?.first_name || "Usuario"}
                            {" "}👋
                        </Typography>

                        <Typography
                            sx={{
                                opacity:.85,
                                textTransform:"capitalize"
                            }}
                        >
                            {date}
                        </Typography>

                        <Typography
                            sx={{
                                mt:2,
                                opacity:.9,
                                maxWidth:500
                            }}
                        >
                            Bienvenido al centro de gestión inteligente de ATLAS.
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            mt={3}
                        >
                            <MiniMetric
                                icon={<PeopleOutlinedIcon/>}
                                text="Usuarios"
                            />

                            <MiniMetric
                                icon={<SecurityOutlinedIcon/>}
                                text="Seguro"
                            />
                        </Stack>
                    </Box>

                    <Avatar
                        sx={{
                            width:110,
                            height:110,
                            background:
                            "rgba(255,255,255,.12)",
                            backdropFilter:
                            "blur(18px)",
                            border:
                            "1px solid rgba(255,255,255,.25)",
                            boxShadow:
                            "0 15px 40px rgba(0,0,0,.15)"
                        }}
                    >

                        <WavingHandOutlinedIcon
                            sx={{
                                fontSize:52
                            }}
                        />
                    </Avatar>
                </Stack>
            </AtlasCard>
        </MouseGlow>
    );
}


function MiniMetric({
    icon,
    text
}) {

    return (
        <Box
            sx={{
                display:"flex",
                alignItems:"center",
                gap:1,
                px:1.5,
                py:.8,
                borderRadius:"12px",
                background:
                "rgba(255,255,255,.14)",
                backdropFilter:
                "blur(10px)",
                border:
                "1px solid rgba(255,255,255,.15)"
            }}
        >

            {icon}
            
            <Typography
                variant="caption"
                fontWeight={800}
            >
                {text}
            </Typography>
        </Box>
    );
};