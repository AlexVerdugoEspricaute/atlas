import { Button } from "@mui/material";
import { colors } from "@/theme";


export default function AtlasButton({

    children,

    variant="primary",

    sx={},

    ...props

}) {


    const styles = {


        primary:{


            background:
            colors.gradients.primary,


            color:"#fff",


            "&:hover":{

                boxShadow:
                `0 0 20px ${colors.primary.glow}`

            }

        },


        outline:{


            border:
            `1px solid ${colors.primary.main}`,


            color:
            colors.primary.main,


            "&:hover":{

                background:
                "rgba(193,18,31,.08)"

            }

        }


    };



    return (

        <Button

            {...props}

            sx={{

                borderRadius:
                "12px",


                fontWeight:600,


                px:3,


                py:1.2,


                transition:
                ".3s ease",


                ...styles[variant],


                ...sx

            }}

        >

            {children}


        </Button>

    );

}