import { Box, Typography } from "@mui/material";
import { useAuth } from "@/store/AuthContext";

export default function WelcomeCard() {
    const { user } = useAuth();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
    const date = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #6E0D25 0%, #880022 100%)",
                color: "#fff",
                mb: 3,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box sx={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)" }} />
            <Box sx={{ position: "absolute", bottom: -20, right: 100, width: 90, height: 90, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.04)" }} />
            <Typography variant="h5" fontWeight={700} sx={{ fontFamily: "system-ui, Segoe UI, sans-serif", position: "relative" }}>
                {greeting}, {user?.first_name} 👋
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.75, textTransform: "capitalize", position: "relative" }}>
                {date}
            </Typography>
        </Box>
    );
}
