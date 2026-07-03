import { Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SecureFooter() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.6,
                mt: 2.5,
                width: "100%",
            }}
        >
            <LockOutlinedIcon sx={{ fontSize: 13, color: "#9ca3af" }} />
            <Typography
                variant="caption"
                sx={{
                    color: "#9ca3af",
                    fontFamily: "system-ui, Segoe UI, sans-serif",
                    letterSpacing: 0.3,
                }}
            >
                Conexión segura y protegida
            </Typography>
        </Box>
    );
}
