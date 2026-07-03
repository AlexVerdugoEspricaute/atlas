import { Box, Typography } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const STATS = [
    { label: "Usuarios activos",   value: "—", icon: <PeopleOutlinedIcon />,     color: "#6E0D25" },
    { label: "Roles asignados",    value: "—", icon: <BadgeOutlinedIcon />,       color: "#0d6e4a" },
    { label: "Actividad mensual",  value: "—", icon: <TrendingUpIcon />,          color: "#0d4a6e" },
    { label: "Tareas completadas", value: "—", icon: <CheckCircleOutlinedIcon />, color: "#6e4a0d" },
];

export default function StatsCards() {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", lg: "repeat(4, 1fr)" },
                gap: 2,
                mb: 3,
            }}
        >
            {STATS.map(({ label, value, icon, color }) => (
                <Box
                    key={label}
                    sx={{
                        bgcolor: "#fff",
                        borderRadius: 3,
                        p: 2.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                        border: "1px solid rgba(0,0,0,0.05)",
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: `${color}18`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color,
                            flexShrink: 0,
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1 }}>{value}</Typography>
                        <Typography variant="caption" color="text.secondary">{label}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
