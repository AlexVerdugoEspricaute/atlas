import {
    Box,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import Sidebar from "@/components/layout/Sidebar";
import AppHeader from "@/components/layout/AppHeader";


const SIDEBAR_STORAGE_KEY = "atlas_sidebar_open";


export default function MainLayout({
    children,
    title = "Dashboard",
}) {

    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("md")
    );

    const isTablet = useMediaQuery(
        theme.breakpoints.between("md", "lg")
    );


    const [desktopOpen, setDesktopOpen] = useState(() => {
        const saved =
            localStorage.getItem(
                SIDEBAR_STORAGE_KEY
            );

        return saved !== "false";
    });


    const [mobileOpen, setMobileOpen] = useState(false);


    const sidebarOpen =
        isTablet
            ? false
            : desktopOpen;


    useEffect(() => {
        localStorage.setItem(
            SIDEBAR_STORAGE_KEY,
            String(desktopOpen)
        );
    }, [desktopOpen]);


    const handleSidebarToggle = () => {

        if (isMobile) {
            setMobileOpen(prev => !prev);
            return;
        }

        setDesktopOpen(prev => !prev);
    };


    return (
        <Box
            sx={{
                display:"flex",
                minHeight:"100vh",
                width:"100%",
                overflow:"hidden",
                bgcolor:"background.default",
            }}
        >

            <Sidebar
                open={
                    isMobile
                    ? mobileOpen
                    : sidebarOpen
                }

                variant={
                    isMobile
                    ? "temporary"
                    : "permanent"
                }

                onClose={() =>
                    setMobileOpen(false)
                }
            />


            <Box
                sx={{
                    flexGrow:1,
                    minWidth:0,
                    height:"100vh",
                    display:"flex",
                    flexDirection:"column",
                }}
            >

                <AppHeader
                    open={
                        isMobile
                        ? mobileOpen
                        : sidebarOpen
                    }

                    onToggle={
                        handleSidebarToggle
                    }

                    title={title}
                />


                <Box
                    component="main"
                    sx={{
                        flexGrow:1,
                        overflow:"auto",

                        p:{
                            xs:2,
                            sm:2,
                            lg:3,
                        },

                        background:
                            theme.palette.mode === "dark"
                            ?
                            "radial-gradient(circle at top right, rgba(193,18,31,.10), transparent 40%)"
                            :
                            "radial-gradient(circle at top right, rgba(193,18,31,.04), transparent 40%)",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}