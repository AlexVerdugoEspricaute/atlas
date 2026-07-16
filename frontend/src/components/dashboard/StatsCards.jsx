import { Box, Typography, Stack, Chip } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { AtlasCard, IconBadge, MouseGlow } from "@/design-system";

export default function StatsCards() {
    const theme = useTheme();

    const STATS = [
        {
            label: "Usuarios totales",
            value: "—",
            description: "Usuarios registrados",
            icon: <PeopleOutlinedIcon />,
            color: theme.palette.primary.main,
            trend: "+12%",
        },

        {
            label: "Roles activos",
            value: "—",
            description: "Permisos configurados",
            icon: <AdminPanelSettingsOutlinedIcon />,
            color: "#16A34A",
            trend: "Activo",
        },

        {
            label: "Actividad",
            value: "—",
            description: "Acciones este mes",
            icon: <TrendingUpOutlinedIcon />,
            color: "#2563EB",
            trend: "+8%",
        },

        {
            label: "Seguridad",
            value: "99%",
            description: "Estado protegido",
            icon: <SecurityOutlinedIcon />,
            color: "#F59E0B",
            trend: "Óptimo",
        },
    ];

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2,1fr)",
                    lg: "repeat(4,1fr)",
                },
                gap: 3,
            }}
        >
            {STATS.map((item) => (
                <MouseGlow key={item.label}>
                    <AtlasCard
                        sx={{
                            height: "100%",
                            cursor: "pointer",
                            overflow: "hidden",
                            "&:hover .stat-value": {
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        <Stack spacing={2.5}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <IconBadge color={item.color}>{item.icon}</IconBadge>

                                <Chip
                                    label={item.trend}
                                    size="small"
                                    sx={{
                                        fontWeight: 800,
                                        background: `${item.color}15`,
                                        color: item.color,
                                        borderRadius: "12px",
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    className="stat-value"
                                    variant="h3"
                                    fontWeight={900}
                                    sx={{
                                        letterSpacing: "-0.05em",
                                        transition: ".25s ease",
                                    }}
                                >
                                    {item.value}
                                </Typography>
                                <Typography
                                    fontWeight={800}
                                    sx={{
                                        mt: 0.5,
                                    }}
                                >
                                    {item.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </Box>
                        </Stack>
                    </AtlasCard>
                </MouseGlow>
            ))}
        </Box>
    );
}
