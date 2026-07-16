import {
    Box,
    Typography,
    Stack,
    useTheme
} from "@mui/material";

import {
    useNavigate
} from "react-router-dom";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import {
    AtlasCard,
    MouseGlow,
    IconBadge
} from "@/design-system";


const ACTIONS = [
    {
        label:"Crear usuario",
        description:"Registrar nuevo usuario",
        icon:<PersonAddOutlinedIcon />,
        path:"/users/create",
        color:"#C1121F"
    },
    {
        label:"Gestionar roles",
        description:"Administrar permisos",
        icon:<GroupAddOutlinedIcon />,
        path:"/roles",
        color:"#2563EB"
    },
    {
        label:"Generar reporte",
        description:"Ver estadísticas",
        icon:<AssessmentOutlinedIcon />,
        path:"/reports",
        color:"#16A34A"
    },
    {
        label:"Configuración",
        description:"Ajustes del sistema",
        icon:<SettingsOutlinedIcon />,
        path:"/settings",
        color:"#7C3AED"
    }
];


export default function QuickActions(){

    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <MouseGlow>
            <AtlasCard>

                <Box sx={{mb:3}}>
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        mb={0.5}
                    >
                        Acciones rápidas
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Accesos frecuentes del sistema.
                    </Typography>
                </Box>


                <Box
                    sx={{
                        display:"grid",
                        gridTemplateColumns:{
                            xs:"1fr",
                            sm:"repeat(2,1fr)",
                            md:"repeat(4,1fr)"
                        },
                        gap:2
                    }}
                >
                {
                    ACTIONS.map(action=>(
                        <Box
                            key={action.label}
                            onClick={()=>navigate(action.path)}
                            sx={{
                                cursor:"pointer",
                                minHeight:130,
                                borderRadius:"14px",
                                background:
                                    theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,.04)"
                                    : "linear-gradient(145deg, rgba(255,255,255,.9), rgba(248,250,252,.8))",
                                border:
                                    `1px solid ${theme.palette.divider}`,
                                transition:
                                    "all .3s cubic-bezier(.4,0,.2,1)",
                                display:"flex",
                                alignItems:"center",
                                p:2,
                                "&:hover":{
                                    transform:
                                        "translateY(-4px)",
                                    borderColor:
                                        `${action.color}55`,
                                    boxShadow:
                                        `0 15px 35px ${action.color}20`
                                }
                            }}
                        >
                            <Stack spacing={1.2}>
                                <IconBadge
                                    color={action.color}
                                >
                                    {action.icon}
                                </IconBadge>

                                <Typography
                                    fontWeight={800}
                                    fontSize=".9rem"
                                >
                                    {action.label}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {action.description}
                                </Typography>
                            </Stack>
                        </Box>
                    ))
                }
                </Box>
            </AtlasCard>
        </MouseGlow>
    );
}