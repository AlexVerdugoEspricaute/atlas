import { AppBar, IconButton, Toolbar, Tooltip, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import UserAvatar from "@/components/auth/UserAvatar";

export default function AppHeader({ open, onToggle, title = "Dashboard" }) {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "#fff",
                borderBottom: "1px solid rgba(110,13,37,0.1)",
                color: "#1a1a2e",
                zIndex: (t) => t.zIndex.drawer - 1,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
        >
            <Toolbar sx={{ gap: 1.5, minHeight: "64px !important" }}>
                <IconButton onClick={onToggle} size="small" sx={{ color: "#6E0D25" }}>
                    {open ? <MenuOpenIcon /> : <MenuIcon />}
                </IconButton>

                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ fontFamily: "system-ui, Segoe UI, sans-serif", color: "#1a1a2e", lineHeight: 1 }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                    </Typography>
                </Box>

                <Tooltip title="Notificaciones">
                    <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <NotificationsOutlinedIcon />
                    </IconButton>
                </Tooltip>

                <UserAvatar />
            </Toolbar>
        </AppBar>
    );
}
