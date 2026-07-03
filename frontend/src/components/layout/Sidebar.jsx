import {
    Avatar, Box, Button, Divider, IconButton, InputAdornment,
    List, ListItemButton, ListItemIcon, ListItemText,
    TextField, Tooltip, Typography,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";
import { useMsal } from "@azure/msal-react";

const W_OPEN = 260;
const W_CLOSED = 72;

const NAV = [
    { label: "Dashboard",     icon: <DashboardOutlinedIcon />, path: "/" },
    { label: "Usuarios",      icon: <PeopleOutlinedIcon />,    path: "/users" },
    { label: "Roles",         icon: <BadgeOutlinedIcon />,     path: "/roles" },
    { label: "Configuración", icon: <SettingsOutlinedIcon />,  path: "/settings" },
];
export default function Sidebar({ open }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { instance } = useMsal();

    const initials = [user?.first_name, user?.last_name]
        .filter(Boolean).map((n) => n[0].toUpperCase()).join("") || "U";

    const handleLogout = () => {
        logout();
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) instance.logoutRedirect({ account: accounts[0] });
    };

    return (
        <Box
            sx={{
                width: open ? W_OPEN : W_CLOSED,
                flexShrink: 0,
                height: "100vh",
                position: "sticky",
                top: 0,
                bgcolor: "#fff",
                borderRight: "1px solid rgba(110,13,37,0.18)",
                boxShadow: open
                    ? "4px 0 32px rgba(110,13,37,0.1), 2px 0 8px rgba(0,0,0,0.04)"
                    : "2px 0 12px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease",
                overflow: "hidden",
            }}
        >
            {/* ── Logo ── */}
            <Box
                sx={{
                    height: 70,
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    flexShrink: 0,
                    justifyContent: open ? "flex-start" : "center",
                    cursor: "pointer",
                    "& .logo-icon": {
                        transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                    },
                    "&:hover .logo-icon": {
                        transform: "rotate(90deg)",
                    },
                }}
                onClick={() => navigate("/")}
            >
                <AppsIcon className="logo-icon" sx={{ color: "#6E0D25", fontSize: 28, flexShrink: 0 }} />
                <Box
                    sx={{
                        overflow: "hidden",
                        opacity: open ? 1 : 0,
                        transition: "opacity 0.2s ease",
                        whiteSpace: "nowrap",
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ letterSpacing: 2, fontFamily: "system-ui, Segoe UI, sans-serif", lineHeight: 1.1 }}
                    >
                        ATLAS
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#9ca3af", letterSpacing: 0.5 }}>
                        Sistema de Gestión
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(110,13,37,0.08)" }} />

            {/* ── Search ── */}
            <Box sx={{ px: 1.5, py: 1.5, flexShrink: 0 }}>
                <Tooltip title={!open ? "Buscar" : ""} placement="right">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Buscar..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#9ca3af", fontSize: 18 }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                bgcolor: "#F8F7F5",
                                transition: "all 0.2s ease",
                                "& fieldset": { borderColor: "transparent" },
                                "&:hover fieldset": { borderColor: "#6E0D25" },
                                "&.Mui-focused fieldset": { borderColor: "#6E0D25", borderWidth: 2 },
                                "& input": {
                                    opacity: open ? 1 : 0,
                                    transition: "opacity 0.15s ease",
                                    width: open ? "auto" : 0,
                                    padding: open ? undefined : 0,
                                },
                            },
                        }}
                    />
                </Tooltip>
            </Box>

            <Divider sx={{ borderColor: "rgba(110,13,37,0.06)" }} />

            {/* ── Nav ── */}
            <List sx={{ px: 1, py: 1.5, flexGrow: 1 }}>
                {NAV.map(({ label, icon, path }) => {
                    const active = pathname === path;
                    return (
                        <Tooltip key={label} title={!open ? label : ""} placement="right">
                            <ListItemButton
                                onClick={() => navigate(path)}
                                selected={active}
                                sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    minHeight: 44,
                                    px: open ? 1.5 : 0,
                                    justifyContent: open ? "flex-start" : "center",
                                    transition: "all 0.2s ease",
                                    position: "relative",
                                    overflow: "hidden",
                                    "&::before": active ? {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        top: "20%",
                                        height: "60%",
                                        width: 3,
                                        bgcolor: "#6E0D25",
                                        borderRadius: "0 3px 3px 0",
                                        boxShadow: "0 0 8px rgba(110,13,37,0.6)",
                                    } : {},
                                    "&.Mui-selected": {
                                        bgcolor: "rgba(110,13,37,0.07)",
                                        "& .MuiListItemIcon-root": { color: "#6E0D25" },
                                        "& .MuiListItemText-primary": { color: "#6E0D25", fontWeight: 600 },
                                    },
                                    "&:hover": {
                                        bgcolor: "rgba(110,13,37,0.05)",
                                        "& .MuiListItemIcon-root": { color: "#6E0D25" },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: open ? 36 : "unset",
                                        color: active ? "#6E0D25" : "#6b7280",
                                        justifyContent: "center",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                {open && (
                                    <ListItemText
                                        primary={label}
                                        primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }}
                                    />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    );
                })}
            </List>

            {/* ── User + Logout ── */}
            <Divider sx={{ borderColor: "rgba(110,13,37,0.08)" }} />
            <Box sx={{ p: open ? 2 : 1.5, flexShrink: 0 }}>
                {open ? (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                            <Avatar
                                sx={{
                                    width: 38,
                                    height: 38,
                                    bgcolor: "#6E0D25",
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    flexShrink: 0,
                                    boxShadow: "0 0 10px rgba(110,13,37,0.3)",
                                }}
                            >
                                {initials}
                            </Avatar>
                            <Box sx={{ overflow: "hidden" }}>
                                <Typography
                                    variant="body2"
                                    fontWeight={700}
                                    sx={{
                                        fontFamily: "system-ui, Segoe UI, sans-serif",
                                        lineHeight: 1.2,
                                        color: "#1a1a2e",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {user?.first_name} {user?.last_name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "#9ca3af",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "block",
                                    }}
                                >
                                    {user?.email}
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
                            onClick={handleLogout}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "0.8rem",
                                color: "#6E0D25",
                                borderColor: "rgba(110,13,37,0.25)",
                                "&:hover": {
                                    borderColor: "#6E0D25",
                                    bgcolor: "rgba(110,13,37,0.05)",
                                    boxShadow: "0 0 8px rgba(110,13,37,0.15)",
                                },
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                                bgcolor: "#6E0D25",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                boxShadow: "0 0 8px rgba(110,13,37,0.3)",
                            }}
                        >
                            {initials}
                        </Avatar>
                        <Tooltip title="Cerrar sesión" placement="right">
                            <IconButton
                                size="small"
                                onClick={handleLogout}
                                sx={{ color: "#6E0D25", "&:hover": { bgcolor: "rgba(110,13,37,0.08)" } }}
                            >
                                <LogoutIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
