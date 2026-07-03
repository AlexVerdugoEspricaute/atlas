import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import AppHeader from "@/components/layout/AppHeader";

export default function MainLayout({ children, title }) {
    const [open, setOpen] = useState(true);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F4F6F8" }}>
            <Sidebar open={open} />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <AppHeader open={open} onToggle={() => setOpen((p) => !p)} title={title} />
                <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
