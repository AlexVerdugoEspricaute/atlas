import { Avatar, Box, Chip, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const EVENTS = [
    { label: "Usuario creado",            desc: "Se registró un nuevo usuario en el sistema.",  time: "Hace 2 min",  icon: <PersonOutlinedIcon />,  color: "#6E0D25" },
    { label: "Acceso seguro",             desc: "Inicio de sesión exitoso desde Chrome.",        time: "Hace 10 min", icon: <LockOutlinedIcon />,    color: "#0d6e4a" },
    { label: "Configuración actualizada", desc: "Se modificaron los permisos de un rol.",       time: "Hace 1 hora", icon: <SettingsOutlinedIcon />, color: "#0d4a6e" },
];

export default function ActivityTimeline() {
    return (
        <Box
            sx={{
                bgcolor: "#fff",
                borderRadius: 3,
                p: 2.5,
                boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.05)",
            }}
        >
            <Typography variant="subtitle2" fontWeight={600} color="text.secondary" mb={2}>
                Actividad reciente
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {EVENTS.map(({ label, desc, time, icon, color }) => (
                    <Box key={label} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: `${color}18`, color, flexShrink: 0 }}>
                            {icon}
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography variant="body2" fontWeight={600}>{label}</Typography>
                            <Typography variant="caption" color="text.secondary">{desc}</Typography>
                        </Box>
                        <Chip
                            label={time}
                            size="small"
                            sx={{ fontSize: "0.7rem", bgcolor: "#F4F6F8", color: "#9ca3af", height: 22, flexShrink: 0 }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
