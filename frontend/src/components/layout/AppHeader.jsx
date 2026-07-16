import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import UserAvatar from "@/components/auth/UserAvatar";

import {
    ThemeToggleButton,
} from "@/design-system";


export default function AppHeader({
    open,
    onToggle,
    title = "Dashboard"
}) {

    const today = new Date()
        .toLocaleDateString(
            "es-ES",
            {
                weekday:"long",
                day:"numeric",
                month:"long",
            }
        );

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor:
                    "background.paper",
                color:
                    "text.primary",
                backdropFilter:
                    "blur(18px)",
                borderBottom:
                    "1px solid",
                borderColor:
                    "divider",
                transition:
                    ".35s ease",
                zIndex:
                    theme =>
                    theme.zIndex.drawer + 1,
            }}
        >

            <Toolbar
                sx={{
                    minHeight:
                        "72px !important",
                    px:{
                        xs:2,
                        md:3,
                    },
                    gap:2,
                }}
            >

                {/* Sidebar button */}

                <Tooltip
                    title={
                        open
                        ? "Contraer menú"
                        : "Abrir menú"
                    }
                >
                    <IconButton
                        onClick={onToggle}
                        sx={{
                            color:
                                "primary.main",
                            "&:hover":{
                                bgcolor:
                                "rgba(193,18,31,.08)",
                                boxShadow:
                                "0 0 15px rgba(193,18,31,.20)"
                            }
                        }}
                    >
                        {
                            open
                            ?
                            <MenuOpenIcon />
                            :
                            <MenuIcon />
                        }
                    </IconButton>
                </Tooltip>

                {/* Title */}

                <Box
                    sx={{
                        flexGrow:1,
                        minWidth:0,
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                            lineHeight:1.1,
                            letterSpacing:
                                "-0.02em",
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            textTransform:
                            "capitalize"
                        }}
                    >
                        {today}
                    </Typography>
                </Box>

                {/* Theme */}
                <ThemeToggleButton />

                {/* Notifications */}
                <Tooltip
                    title="Notificaciones"
                >

                    <IconButton
                        sx={{
                            color:
                            "text.secondary",
                            "&:hover":{
                                color:
                                "primary.main",
                                bgcolor:
                                "rgba(193,18,31,.08)"
                            }
                        }}
                    >
                        <NotificationsOutlinedIcon />
                    </IconButton>
                </Tooltip>
                {/* User */}
                <UserAvatar />
            </Toolbar>
        </AppBar>
    );
}