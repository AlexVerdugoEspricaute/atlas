import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import AppHeader from "@/components/layout/AppHeader";

export default function MainLayout({ children, title }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); // < 900px
    const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900–1200px

    const [desktopOpen, setDesktopOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    // En tablet, el sidebar arranca colapsado automáticamente
    const sidebarOpen = isTablet ? false : desktopOpen;

    const handleToggle = () => {
        if (isMobile) setMobileOpen((p) => !p);
        else setDesktopOpen((p) => !p);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F4F6F8" }}>
            <Sidebar
                open={isMobile ? mobileOpen : sidebarOpen}
                variant={isMobile ? "temporary" : "permanent"}
                onClose={() => setMobileOpen(false)}
            />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
                <AppHeader
                    open={isMobile ? mobileOpen : sidebarOpen}
                    onToggle={handleToggle}
                    title={title}
                />
                <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, overflow: "auto" }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

