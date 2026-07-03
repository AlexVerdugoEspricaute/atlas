import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SplitBackground from "@/components/layout/SplitBackground";
import LoginHeader from "@/components/auth/LoginHeader";
import LoginButton from "@/components/auth/LoginButton";
import MicrosoftDivider from "@/components/auth/MicrosoftDivider";
import LocalLoginForm from "@/components/auth/LocalLoginForm";
import SecureFooter from "@/components/auth/SecureFooter";

const FACE_SX = {
    width: "100%",
    p: { xs: 2.5, sm: 4 },
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 25px 70px rgba(0,0,0,0.15)",
    border: "1px solid rgba(0,0,0,0.05)",
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

    // Mantenemos la lógica de negocio pura: el giro solo altera el estado sin disparar alertas intrusivas
    const handleFlip = (t) => { 
        setTab(t); 
        setFlipped(true); 
    };

    return (
        <SplitBackground>
            <Box sx={{ perspective: "1200px", width: "100%", maxWidth: 420, px: { xs: 2, sm: 0 } }}>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: flipped
                            ? (tab === 1
                                ? { xs: 720, sm: 640, md: 610 }
                                : { xs: 600, sm: 560, md: 530 })
                            : { xs: 430, sm: 410, md: 400 },
                        transformStyle: "preserve-3d",
                        transition:
                            "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), height 0.35s ease",
                        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {/* ── CARA FRONTAL ── */}
                    <Box sx={FACE_SX}>
                        <LoginHeader />

                        <Box sx={{ width: "100%" }}>
                            <LoginButton />
                        </Box>

                        <MicrosoftDivider />

                        <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 0.5 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => handleFlip(0)}
                                sx={{
                                    py: 1.2,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    borderColor: "#6E0D25",
                                    color: "#6E0D25",
                                    "&:hover": {
                                        borderColor: "#5A0B1F",
                                        backgroundColor: "rgba(110,13,37,0.05)",
                                    },
                                }}
                            >
                                Iniciar sesión
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => handleFlip(1)}
                                sx={{
                                    py: 1.2,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    bgcolor: "#6E0D25",
                                    "&:hover": { bgcolor: "#5A0B1F" },
                                }}
                            >
                                Registrarse
                            </Button>
                        </Box>

                        <SecureFooter />
                    </Box>

                    {/* ── CARA TRASERA ── */}
                    <Box
                        sx={{
                            ...FACE_SX,
                            alignItems: "flex-start",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 1 }}>
                            <LoginHeader />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                mb: 0.5,
                            }}
                        >
                            <IconButton
                                onClick={() => setFlipped(false)}
                                size="small"
                                sx={{ color: "#6E0D25", mr: 1 }}
                            >
                                <ArrowBackIcon fontSize="small" />
                            </IconButton>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                                sx={{ fontFamily: "system-ui, Segoe UI, sans-serif" }}
                            >
                                {tab === 0 ? "Iniciar sesión" : "Crear cuenta"}
                            </Typography>
                        </Box>

                        <Box sx={{ width: "100%" }}>
                            <LocalLoginForm tab={tab} />
                        </Box>

                        <SecureFooter />
                    </Box>
                </Box>
            </Box>
        </SplitBackground>
    );
}
