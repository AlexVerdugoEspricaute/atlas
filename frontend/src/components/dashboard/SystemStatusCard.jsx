import {
    Box,
    Typography,
    LinearProgress,
    Chip,
    Stack
} from "@mui/material";


import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";


import {
    useTheme
} from "@mui/material/styles";


import {
    AtlasCard,
    MouseGlow,
    IconBadge
} from "@/design-system";



const SYSTEMS = [

    {
        label:"API Backend",
        status:"Operativo",
        value:98,
        icon:<CloudOutlinedIcon />,
        color:"#2563EB"
    },


    {
        label:"Base de datos",
        status:"Operativo",
        value:94,
        icon:<StorageOutlinedIcon />,
        color:"#16A34A"
    },


    {
        label:"Seguridad",
        status:"Protegido",
        value:100,
        icon:<SecurityOutlinedIcon />,
        color:"#C1121F"
    }

];




export default function SystemStatusCard(){


    const theme = useTheme();



    return (

        <MouseGlow>


            <AtlasCard

                sx={{

                    height:"100%"

                }}

            >


                <Stack

                    spacing={3}

                >



                    <Box

                        sx={{

                            display:"flex",

                            justifyContent:"space-between",

                            alignItems:"center"

                        }}

                    >



                        <Box>


                            <Typography

                                variant="h6"

                                fontWeight={800}

                            >

                                Estado del sistema

                            </Typography>



                            <Typography

                                variant="body2"

                                color="text.secondary"

                            >

                                Monitoreo general

                            </Typography>


                        </Box>





                        <Chip

                            icon={

                                <CheckCircleOutlinedIcon

                                    sx={{
                                        fontSize:18
                                    }}

                                />

                            }


                            label="Online"


                            size="small"



                            sx={{


                                background:
                                "rgba(22,163,74,.12)",



                                color:"#16A34A",



                                fontWeight:700,



                                borderRadius:"10px"

                            }}


                        />



                    </Box>





                    <Stack

                        spacing={3}

                    >


                    {
                        SYSTEMS.map((item)=>(


                            <Box

                                key={item.label}

                            >


                                <Box

                                    sx={{

                                        display:"flex",

                                        alignItems:"center",

                                        gap:1.5,

                                        mb:1.5

                                    }}

                                >



                                    <IconBadge

                                        color={item.color}

                                    >

                                        {item.icon}


                                    </IconBadge>





                                    <Box

                                        sx={{

                                            flexGrow:1

                                        }}

                                    >



                                        <Typography

                                            fontWeight={700}

                                            variant="body2"

                                        >

                                            {item.label}


                                        </Typography>




                                        <Typography

                                            variant="caption"

                                            color="text.secondary"

                                        >

                                            {item.status}


                                        </Typography>


                                    </Box>





                                    <Typography

                                        fontWeight={800}

                                        variant="body2"

                                    >

                                        {item.value}%


                                    </Typography>



                                </Box>





                                <LinearProgress

                                    variant="determinate"

                                    value={item.value}



                                    sx={{


                                        height:8,



                                        borderRadius:10,



                                        background:
                                        theme.palette.mode === "dark"
                                        ?
                                        "rgba(255,255,255,.08)"
                                        :
                                        "#F1F5F9",



                                        "& .MuiLinearProgress-bar":{


                                            borderRadius:10,



                                            background:

                                            `linear-gradient(
                                                90deg,
                                                ${item.color},
                                                ${theme.palette.primary.main}
                                            )`

                                        }


                                    }}

                                />



                            </Box>


                        ))
                    }


                    </Stack>



                </Stack>


            </AtlasCard>


        </MouseGlow>

    );

}