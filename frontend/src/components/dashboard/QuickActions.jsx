import { Box, Button, Typography } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const ACTIONS = [
    { label: "Nuevo usuario",  icon: <PersonAddOutlinedIcon /> },
    { label: "Nuevo rol",      icon: <GroupAddOutlinedIcon /> },
    { label: "Nuevo reporte",  icon: <AssignmentOutlinedIcon /> },
    { label: "Configuración",  icon: <SettingsOutlinedIcon /> },
];

export default function QuickActions() {
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
            <Typography variant="subtitle2" fontWeight={600} color="text.secondary" mb={1.5}>
                Acciones rápidas
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                {ACTIONS.map(({ label, icon }) => (
                    <Button
                        key={label}
                        fullWidth
                        variant="outlined"
                        startIcon={icon}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            borderColor: "rgba(0,0,0,0.1)",
                            color: "#374151",
                            py: 1,
                            justifyContent: "flex-start",
                            "&:hover": {
                                borderColor: "#6E0D25",
                                color: "#6E0D25",
                                bgcolor: "rgba(110,13,37,0.04)",
                            },
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
