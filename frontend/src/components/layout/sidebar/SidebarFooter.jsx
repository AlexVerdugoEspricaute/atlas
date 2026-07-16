import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import UserAvatar from "@/components/auth/UserAvatar";
import { ThemeToggleButton } from "@/design-system";
import useLogout from "@/hooks/useLogout";

export default function SidebarFooter() {
    const { handleLogout } = useLogout();

    return (
        <Box>
            <Divider />

            <Box
                sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                    p:2,
                }}
            >
                <UserAvatar />

                <Box
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        gap:1,
                    }}
                >
                    <ThemeToggleButton />

                    <Tooltip title="Cerrar sesión">
                        <IconButton
                            onClick={handleLogout}
                            sx={{
                                color:"text.secondary",
                                "&:hover":{
                                    color:"error.main",
                                    backgroundColor:"rgba(193,18,31,.08)",
                                },
                            }}
                        >
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
}