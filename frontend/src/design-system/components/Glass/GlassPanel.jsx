import { Box } from "@mui/material";

import { colors } from "@/theme";


export default function GlassPanel({

    children,

    sx = {}

}) {


    return (

        <Box

            sx={{


                background:
                "rgba(255,255,255,0.75)",


                backdropFilter:
                "blur(16px)",


                WebkitBackdropFilter:
                "blur(16px)",


                border:
                `1px solid ${colors.border.light}`,


                borderRadius:
                "20px",


                boxShadow:
                "0 20px 50px rgba(15,23,42,.08)",


                transition:
                ".35s ease",


                "&:hover":{


                    border:
                    `1px solid ${colors.border.hover}`,


                    boxShadow:
                    "0 0 25px rgba(193,18,31,.15)"

                },


                ...sx


            }}

        >

            {children}


        </Box>


    );

}