import { Button, Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/authConfig";

export default function LoginButton() {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect({
            ...loginRequest,
            prompt: "select_account",
        });
    };

    return (
        <Button
            fullWidth
            onClick={handleLogin}
            sx={{
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.95rem",

                backgroundColor: "#fff",
                color: "#1f1f1f",
                border: "2px solid #bd0202",

                display: "flex",
                alignItems: "center",
                gap: 1.5,

                fontFamily: "Segoe UI, system-ui, sans-serif",

                "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#bd0202",
                },
            }}
        >
            {/* ICONO MICROSOFT ESTILO CUBO */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 8px)",
                    gridTemplateRows: "repeat(2, 8px)",
                    gap: "2px",
                }}
            >
                <Box sx={{ width: 8, height: 8, bgcolor: "#F25022", borderRadius: "1px" }} />
                <Box sx={{ width: 8, height: 8, bgcolor: "#7FBA00", borderRadius: "1px" }} />
                <Box sx={{ width: 8, height: 8, bgcolor: "#00A4EF", borderRadius: "1px" }} />
                <Box sx={{ width: 8, height: 8, bgcolor: "#FFB900", borderRadius: "1px" }} />
            </Box>

            Continuar con Microsoft
        </Button>
    );
}