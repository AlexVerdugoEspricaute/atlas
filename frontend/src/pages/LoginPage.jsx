import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SplitBackground from "@/components/layout/SplitBackground";
import LoginHeader from "@/components/auth/LoginHeader";
import LoginButton from "@/components/auth/LoginButton";
import MicrosoftDivider from "@/components/auth/MicrosoftDivider";
import LocalLoginForm from "@/components/auth/LocalLoginForm";
import SecureFooter from "@/components/auth/SecureFooter";

import { ThemeToggleButton } from "@/design-system";

const FACE_SX = {
    width: "100%",
    p: { xs: 2.5, sm: 4 },
    borderRadius: 4,
    backgroundColor: "background.paper",
    backdropFilter: "blur(10px)",
    boxShadow: "0 25px 70px rgba(0,0,0,0.15)",
    border: "1px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
};

export default function LoginPage() {
    const [flipped, setFlipped] = useState(false);
    const [tab, setTab] = useState(0);

    const handleFlip = (t) => {
        setTab(t);
        setFlipped(true);
    };

    return (
        <SplitBackground>
            <Box
                sx={{
                    perspective:"1200px",
                    width:"100%",
                    maxWidth:420,
                    px:{xs:2,sm:0}
                }}
            >
                <Box
                    sx={{
                        position:"relative",
                        width:"100%",
                        height: flipped
                        ?
                        (
                            tab === 1
                            ?
                            {xs:720,sm:640,md:610}
                            :
                            {xs:600,sm:560,md:530}
                        )
                        :
                        {xs:430,sm:410,md:400},
                        transformStyle:"preserve-3d",
                        transition:
                        "transform .65s cubic-bezier(.4,0,.2,1), height .35s ease",
                        transform:
                        flipped
                        ?
                        "rotateY(180deg)"
                        :
                        "rotateY(0deg)",
                    }}
                >
                    <Box sx={FACE_SX}>
                        <Box
                            sx={{
                                position:"absolute",
                                top:30,
                                right:30,
                                zIndex:10,
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <ThemeToggleButton />
                        </Box>
                        <LoginHeader />
                        <Box sx={{width:"100%"}}>
                            <LoginButton />
                        </Box>
                        <MicrosoftDivider />
                        <Box
                            sx={{
                                display:"flex",
                                gap:2,
                                width:"100%",
                                mt:.5
                            }}
                        >
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={()=>handleFlip(0)}
                                sx={{
                                    py:1.2,
                                    borderRadius:2,
                                    textTransform:"none",
                                    fontWeight:600,
                                    fontSize:".9rem",
                                    borderColor:"primary.main",
                                    color:"primary.main",
                                    "&:hover":{
                                        borderColor:"primary.dark",
                                        backgroundColor:
                                        "action.hover",
                                    }
                                }}
                            >
                                Iniciar sesión
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={()=>handleFlip(1)}
                                sx={{
                                    py:1.2,
                                    borderRadius:2,
                                    textTransform:"none",
                                    fontWeight:600,
                                    fontSize:".9rem",
                                    bgcolor:"primary.main",
                                    "&:hover":{
                                        bgcolor:"primary.dark"
                                    }
                                }}
                            >
                                Registrarse
                            </Button>
                        </Box>
                        <SecureFooter />
                    </Box>
                    <Box
                        sx={{
                            ...FACE_SX,
                            alignItems:"flex-start",
                            transform:"rotateY(180deg)",
                        }}
                    >
                        <Box
                            sx={{
                                position:"absolute",
                                top:30,
                                right:30,
                                zIndex:10,
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <ThemeToggleButton />
                        </Box>
                        <Box
                            sx={{
                                width:"100%",
                                display:"flex",
                                justifyContent:"center",
                                mb:1
                            }}
                        >
                            <LoginHeader />
                        </Box>
                        <Box
                            sx={{
                                display:"flex",
                                alignItems:"center",
                                width:"100%",
                                mb:.5
                            }}
                        >
                            <IconButton
                                onClick={()=>setFlipped(false)}
                                size="small"
                                sx={{
                                    color:"primary.main",
                                    mr:1
                                }}
                            >
                                <ArrowBackIcon fontSize="small"/>
                            </IconButton>
                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                {tab===0
                                ?
                                "Iniciar sesión"
                                :
                                "Crear cuenta"}
                            </Typography>
                        </Box>
                        <Box sx={{width:"100%"}}>
                            <LocalLoginForm tab={tab}/>
                        </Box>
                        <SecureFooter />
                    </Box>
                </Box>
            </Box>
        </SplitBackground>
    );
}