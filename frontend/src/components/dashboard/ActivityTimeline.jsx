import {
    Box,
    Typography,
    Avatar,
    Chip,
    Stack
} from "@mui/material";


import {
    useTheme
} from "@mui/material/styles";


import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";


import {
    AtlasCard,
    MouseGlow
} from "@/design-system";



const ACTIVITIES = [

    {
        title:"Nuevo usuario registrado",
        description:"Se creó una nueva cuenta en el sistema.",
        time:"Hace 2 minutos",
        icon:<PersonAddOutlinedIcon />,
        color:"#C1121F"
    },


    {
        title:"Inicio de sesión exitoso",
        description:"Acceso realizado desde navegador autorizado.",
        time:"Hace 15 minutos",
        icon:<LoginOutlinedIcon />,
        color:"#16A34A"
    },


    {
        title:"Evento de seguridad",
        description:"Se actualizaron permisos de usuario.",
        time:"Hace 1 hora",
        icon:<SecurityOutlinedIcon />,
        color:"#2563EB"
    }

];




export default function ActivityTimeline(){


    const theme = useTheme();



    return (

        <MouseGlow>


            <AtlasCard

                sx={{

                    height:"100%"

                }}

            >



                <Typography

                    variant="h6"

                    fontWeight={800}

                    mb={0.5}

                >

                    Actividad reciente

                </Typography>




                <Typography

                    variant="body2"

                    color="text.secondary"

                    mb={3}

                >

                    Últimos movimientos registrados.

                </Typography>





                <Stack

                    spacing={3}

                >


                {
                    ACTIVITIES.map((item,index)=>(


                        <Box


                            key={index}



                            sx={{


                                display:"flex",



                                gap:2,



                                position:"relative"



                            }}



                        >




                            {
                                index !== ACTIVITIES.length - 1 && (

                                    <Box


                                        sx={{


                                            position:"absolute",



                                            left:20,



                                            top:45,



                                            height:"calc(100% + 15px)",



                                            width:"1px",



                                            background:
                                            theme.palette.divider



                                        }}


                                    />

                                )
                            }






                            <Avatar


                                sx={{



                                    width:42,



                                    height:42,



                                    zIndex:1,



                                    background:

                                    `${item.color}18`,




                                    color:item.color,



                                    border:

                                    `1px solid ${item.color}35`



                                }}



                            >

                                {item.icon}


                            </Avatar>







                            <Box

                                sx={{

                                    flexGrow:1

                                }}

                            >




                                <Typography


                                    variant="body2"


                                    fontWeight={800}



                                >

                                    {item.title}


                                </Typography>





                                <Typography


                                    variant="caption"


                                    color="text.secondary"


                                    display="block"



                                    sx={{

                                        mt:.3

                                    }}



                                >

                                    {item.description}


                                </Typography>






                                <Chip


                                    label={item.time}



                                    size="small"



                                    sx={{



                                        mt:1.2,



                                        height:24,



                                        fontSize:"0.7rem",



                                        background:

                                        theme.palette.mode==="dark"

                                        ?

                                        "rgba(255,255,255,.08)"

                                        :

                                        "#F8FAFC",



                                        color:

                                        theme.palette.text.secondary,



                                        borderRadius:"8px"



                                    }}



                                />




                            </Box>






                        </Box>


                    ))
                }


                </Stack>



            </AtlasCard>



        </MouseGlow>

    );

}