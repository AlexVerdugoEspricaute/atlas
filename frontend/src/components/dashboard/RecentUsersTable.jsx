import {
    Box,
    Avatar,
    Chip,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";


import {
    useTheme
} from "@mui/material/styles";


import {
    AtlasCard,
    MouseGlow
} from "@/design-system";



const USERS = [

    {
        id:1,
        name:"Alex Verdugo",
        email:"alex@email.com",
        role:"Administrador",
        status:"Activo"
    },

    {
        id:2,
        name:"María González",
        email:"maria@email.com",
        role:"Usuario",
        status:"Activo"
    },

    {
        id:3,
        name:"Carlos Pérez",
        email:"carlos@email.com",
        role:"Editor",
        status:"Pendiente"
    },

    {
        id:4,
        name:"Laura Soto",
        email:"laura@email.com",
        role:"Usuario",
        status:"Activo"
    }

];




export default function RecentUsersTable(){


    const theme = useTheme();



    return (

        <MouseGlow>


            <AtlasCard>


                <Box

                    sx={{

                        mb:3

                    }}

                >


                    <Typography

                        variant="h6"

                        fontWeight={800}

                    >

                        Usuarios recientes

                    </Typography>




                    <Typography

                        variant="body2"

                        color="text.secondary"

                    >

                        Últimos usuarios registrados en la plataforma.

                    </Typography>


                </Box>





                <TableContainer>


                    <Table

                        size="small"

                    >


                        <TableHead>


                            <TableRow>


                                {
                                    [
                                        "Usuario",
                                        "Rol",
                                        "Estado"
                                    ]
                                    .map(title=>(

                                        <TableCell

                                            key={title}

                                            sx={{

                                                fontWeight:800,

                                                borderBottom:
                                                `1px solid ${theme.palette.divider}`

                                            }}

                                        >

                                            {title}

                                        </TableCell>

                                    ))
                                }


                            </TableRow>


                        </TableHead>





                        <TableBody>


                        {
                            USERS.map(user=>(


                                <TableRow


                                    key={user.id}


                                    hover


                                    sx={{


                                        transition:
                                        ".25s ease",


                                        "&:hover":{


                                            background:
                                            `${theme.palette.primary.main}08`


                                        }


                                    }}


                                >




                                    <TableCell>


                                        <Box

                                            sx={{

                                                display:"flex",

                                                alignItems:"center",

                                                gap:1.5

                                            }}

                                        >



                                            <Avatar


                                                sx={{


                                                    width:42,


                                                    height:42,



                                                    fontSize:14,



                                                    fontWeight:800,



                                                    background:

                                                    `linear-gradient(
                                                        135deg,
                                                        ${theme.palette.primary.main},
                                                        ${theme.palette.primary.dark}
                                                    )`



                                                }}


                                            >

                                                {
                                                    user.name
                                                    .split(" ")
                                                    .map(x=>x[0])
                                                    .join("")
                                                }


                                            </Avatar>





                                            <Box>


                                                <Typography

                                                    fontWeight={700}

                                                    variant="body2"

                                                >

                                                    {user.name}


                                                </Typography>




                                                <Typography

                                                    variant="caption"

                                                    color="text.secondary"

                                                >

                                                    {user.email}


                                                </Typography>



                                            </Box>




                                        </Box>



                                    </TableCell>






                                    <TableCell>


                                        <Chip


                                            label={user.role}


                                            size="small"



                                            sx={{


                                                background:

                                                `${theme.palette.primary.main}15`,



                                                color:
                                                theme.palette.primary.main,



                                                fontWeight:700,



                                                borderRadius:"10px"


                                            }}


                                        />



                                    </TableCell>







                                    <TableCell>


                                        <Chip


                                            label={user.status}


                                            size="small"



                                            sx={{



                                                background:

                                                user.status==="Activo"

                                                ?

                                                "rgba(22,163,74,.12)"

                                                :

                                                "rgba(245,158,11,.15)",




                                                color:

                                                user.status==="Activo"

                                                ?

                                                "#16A34A"

                                                :

                                                "#B45309",



                                                fontWeight:700,

                                                borderRadius:"10px"


                                            }}



                                        />


                                    </TableCell>




                                </TableRow>



                            ))
                        }



                        </TableBody>



                    </Table>


                </TableContainer>



            </AtlasCard>



        </MouseGlow>

    );

}