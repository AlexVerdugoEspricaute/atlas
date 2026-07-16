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
    MouseGlow
} from "@/design-system";



import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";



const DATA = [

    {
        name:"Ene",
        usuarios:120
    },

    {
        name:"Feb",
        usuarios:210
    },

    {
        name:"Mar",
        usuarios:180
    },

    {
        name:"Abr",
        usuarios:320
    },

    {
        name:"May",
        usuarios:450
    },

    {
        name:"Jun",
        usuarios:520
    }

];




export default function DashboardCharts(){


    const theme = useTheme();



    return (

        <MouseGlow>


            <AtlasCard


                sx={{


                    minHeight:420


                }}


            >



                <Stack

                    spacing={3}

                    height="100%"

                >




                    <Box>


                        <Typography

                            variant="h6"

                            fontWeight={800}

                        >

                            Actividad del sistema


                        </Typography>




                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            Crecimiento de usuarios registrados


                        </Typography>



                    </Box>







                    <Box


                        sx={{


                            flexGrow:1,


                            width:"100%",


                            height:300



                        }}



                    >



                        <ResponsiveContainer

                            width="100%"

                            height="100%"

                        >



                            <AreaChart

                                data={DATA}

                            >




                                <defs>


                                    <linearGradient

                                        id="atlasGradient"

                                        x1="0"

                                        y1="0"

                                        x2="0"

                                        y2="1"

                                    >

                                        <stop

                                            offset="0%"

                                            stopColor={
                                                theme.palette.primary.main
                                            }

                                            stopOpacity={0.35}

                                        />


                                        <stop

                                            offset="100%"

                                            stopColor={
                                                theme.palette.primary.main
                                            }

                                            stopOpacity={0}

                                        />


                                    </linearGradient>


                                </defs>





                                <XAxis

                                    dataKey="name"

                                    axisLine={false}

                                    tickLine={false}

                                />



                                <YAxis

                                    axisLine={false}

                                    tickLine={false}

                                />





                                <Tooltip

                                    contentStyle={{

                                        borderRadius:12,

                                        border:"none",

                                        boxShadow:
                                        "0 10px 30px rgba(0,0,0,.12)"

                                    }}

                                />






                                <Area


                                    type="monotone"


                                    dataKey="usuarios"



                                    stroke={
                                        theme.palette.primary.main
                                    }



                                    strokeWidth={3}



                                    fill="url(#atlasGradient)"



                                />




                            </AreaChart>



                        </ResponsiveContainer>



                    </Box>





                </Stack>



            </AtlasCard>



        </MouseGlow>


    );

}