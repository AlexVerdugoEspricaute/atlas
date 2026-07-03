import {
    Avatar, Box, Button, Divider, Drawer, IconButton, InputAdornment,
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
import Swal from "sweetalert2";
import { showLoadingOverlay, closeAlerts } from "@/utils/alerts";

const W_OPEN = 260;
const W_CLOSED = 72;

const NAV = [
    { label: "Dashboard",     icon: <DashboardOutlinedIcon />, path: "/" },
    { label: "Usuarios",      icon: <PeopleOutlinedIcon />,    path: "/users" },
    { label: "Roles",         icon: <BadgeOutlinedIcon />,     path: "/roles" },
    { label: "Configuración", icon: <SettingsOutlinedIcon />,  path: "/settings" },
];

export default function Sidebar({ open, variant = "permanent", onClose }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { instance } = useMsal();

    // En modo temporal (mobile) siempre muestra contenido expandido
    const expanded = variant === "temporary" ? true : open;

    const initials = [user?.first_name, user?.last_name]
        .filter(Boolean).map((n) => n[0].toUpperCase()).join("") || "U";

    const handleLogout = async () => {
        const result = await Swal.fire({
            html: `
                <div style="text-align:center;padding:0.5rem 0">
                    <div style="width:60px;height:60px;border-radius:50%;background:rgba(110,13,37,0.08);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#6E0D25">
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                    </div>
                    <h2 style="font-size:1.2rem;font-weight:700;color:#1a1a2e;margin:0 0 0.5rem">¿Cerrar sesión?</h2>
                    <p style="font-size:0.875rem;color:#6b7280;margin:0">Serás redirigido al inicio de sesión.</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            buttonsStyling: false,
            reverseButtons: true,
            customClass: {
                popup: "atlas-logout-popup",
                actions: "atlas-logout-actions",
                confirmButton: "atlas-logout-confirm-btn",
                cancelButton: "atlas-logout-cancel-btn",
            },
            showClass: { popup: "animate__animated animate__fadeInDown animate__faster" },
            hideClass: { popup: "animate__animated animate__fadeOutUp animate__faster" },
        });
        if (!result.isConfirmed) return;
        showLoadingOverlay("Cerrando sesión...");
        setTimeout(() => {
            const accounts = instance.getAllAccounts();
            if (accounts.length > 0) {
                logout();
                instance.logoutRedirect({ account: accounts[0] });
            } else {
                logout();
                closeAlerts();
            }
        }, 800);
    };

    const handleNav = (path) => {
        navigate(path);
        if (variant === "temporary" && onClose) onClose();
    };

    const content = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            {/* ── Logo ── */}
            <Box
                sx={{
                    height: 70,
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    flexShrink: 0,
                    justifyContent: expanded ? "flex-start" : "center",
                    cursor: "pointer",
                    "& .logo-icon": { transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" },
                    "&:hover .logo-icon": { transform: "rotate(90deg)" },
                }}
                onClick={() => handleNav("/")}
            >
                <AppsIcon className="logo-icon" sx={{ color: "#6E0D25", fontSize: 28, flexShrink: 0 }} />
                <Box sx={{ overflow: "hidden", opacity: expanded ? 1 : 0, transition: "opacity 0.2s ease", whiteSpace: "nowrap" }}>
                    <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 2, fontFamily: "system-ui, Segoe UI, sans-serif", lineHeight: 1.1 }}>
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
                <Tooltip title={!expanded ? "Buscar" : ""} placement="right">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Buscar..."
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#9ca3af", fontSize: 18 }} />
                                    </InputAdornment>
                                ),
                            },
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
                                    opacity: expanded ? 1 : 0,
                                    transition: "opacity 0.15s ease",
                                    width: expanded ? "auto" : 0,
                                    padding: expanded ? undefined : 0,
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
                        <Tooltip key={label} title={!expanded ? label : ""} placement="right">
                            <ListItemButton
                                onClick={() => handleNav(path)}
                                selected={active}
                                sx={{
                                    borderRadius: 2, mb: 0.5, minHeight: 44,
                                    px: expanded ? 1.5 : 0,
                                    justifyContent: expanded ? "flex-start" : "center",
                                    transition: "all 0.2s ease",
                                    position: "relative", overflow: "hidden",
                                    "&::before": active ? {
                                        content: '""', position: "absolute",
                                        left: 0, top: "20%", height: "60%", width: 3,
                                        bgcolor: "#6E0D25", borderRadius: "0 3px 3px 0",
                                        boxShadow: "0 0 8px rgba(110,13,37,0.6)",
                                    } : {},
                                    "&.Mui-selected": {
                                        bgcolor: "rgba(110,13,37,0.07)",
                                        "& .MuiListItemIcon-root": { color: "#6E0D25" },
                                        "& .MuiListItemText-primary": { color: "#6E0D25", fontWeight: 600 },
                                    },
                                    "&:hover": { bgcolor: "rgba(110,13,37,0.05)", "& .MuiListItemIcon-root": { color: "#6E0D25" } },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: expanded ? 36 : "unset", color: active ? "#6E0D25" : "#6b7280", justifyContent: "center", transition: "color 0.2s ease" }}>
                                    {icon}
                                </ListItemIcon>
                                {expanded && (
                                    <ListItemText primary={label} slotProps={{ primary: { fontSize: "0.875rem", fontWeight: 500 } }} />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    );
                })}
            </List>

            {/* ── User + Logout ── */}
            <Divider sx={{ borderColor: "rgba(110,13,37,0.08)" }} />
            <Box sx={{ p: expanded ? 2 : 1.5, flexShrink: 0 }}>
                {expanded ? (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                            <Avatar sx={{ width: 38, height: 38, bgcolor: "#6E0D25", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0, boxShadow: "0 0 10px rgba(110,13,37,0.3)" }}>
                                {initials}
                            </Avatar>
                            <Box sx={{ overflow: "hidden" }}>
                                <Typography variant="body2" fontWeight={700} sx={{ fontFamily: "system-ui, Segoe UI, sans-serif", lineHeight: 1.2, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {user?.first_name} {user?.last_name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#9ca3af", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                                    {user?.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: "#6E0D25", fontWeight: 500, display: "block", mb: 1.5, opacity: 0.8 }}>
                            Bienvenido de vuelta 👋
                        </Typography>
                        <Button fullWidth variant="outlined" size="small" startIcon={<LogoutIcon sx={{ fontSize: 16 }} />} onClick={handleLogout}
                            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500, fontSize: "0.8rem", color: "#6E0D25", borderColor: "rgba(110,13,37,0.25)", "&:hover": { borderColor: "#6E0D25", bgcolor: "rgba(110,13,37,0.05)", boxShadow: "0 0 8px rgba(110,13,37,0.15)" } }}
                        >
                            Cerrar sesión
                        </Button>
                    </>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 34, height: 34, bgcolor: "#6E0D25", fontSize: "0.8rem", fontWeight: 700, boxShadow: "0 0 8px rgba(110,13,37,0.3)" }}>
                            {initials}
                        </Avatar>
                        <Tooltip title="Cerrar sesión" placement="right">
                            <IconButton size="small" onClick={handleLogout} sx={{ color: "#6E0D25", "&:hover": { bgcolor: "rgba(110,13,37,0.08)" } }}>
                                <LogoutIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>
        </Box>
    );

    // ── Mobile: Drawer temporal con overlay ──
    if (variant === "temporary") {
        return (
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: W_OPEN,
                        bgcolor: "#fff",
                        border: "none",
                        borderRight: "1px solid rgba(110,13,37,0.18)",
                        boxShadow: "4px 0 32px rgba(110,13,37,0.15)",
                    },
                }}
            >
                {content}
            </Drawer>
        );
    }

    // ── Desktop/Tablet: Sidebar permanente ──
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
                boxShadow: open ? "4px 0 32px rgba(110,13,37,0.1), 2px 0 8px rgba(0,0,0,0.04)" : "2px 0 12px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease",
                overflow: "hidden",
            }}
        >
            {content}
        </Box>
    );
}

