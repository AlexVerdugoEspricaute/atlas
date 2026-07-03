import { Box, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

export default function LoginHeader() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                mb: 2,
            }}
        >
            {/* LOGO + TEXTO */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                }}
            >
                <AppsIcon sx={{ color: "#6E0D25", fontSize: 30 }} />

                <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{
                        letterSpacing: 1,
                        fontFamily: "system-ui, Segoe UI, sans-serif",
                        fontWeight: "bold",
                    }}
                >
                    ATLAS
                </Typography>
                
            </Box>
                <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{
                        letterSpacing: 1,
                        fontFamily: "system-ui, Segoe UI, sans-serif",
                        fontWeight: 500,
                    }}
                >
                    Bienvenido 
                </Typography>
            <Typography variant="body2" color="text.secondary" 
                    sx={{
                        letterSpacing: 1,
                        fontFamily: "system-ui, Segoe UI, sans-serif",
                        color: "rgb(41, 41, 41)",
                    }}>
                Inicia sesión para continuar en Atlas
            </Typography>
        </Box>
    );
}