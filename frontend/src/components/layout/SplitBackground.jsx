import {
    Box
} from "@mui/material";

import {
    colors
} from "@/theme";


export default function SplitBackground({
    children
}) {
    return (
        <Box
            sx={{
                minHeight:"100vh",
                width:"100%",
                position:"relative",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                overflow:"hidden",
                background:
                    `linear-gradient(
                        135deg,
                        ${colors.primary.dark},
                        ${colors.primary.main}
                    )`,
                transition:
                    "background .35s ease"
            }}
        >

            {/* CURVA PREMIUM */}

            <Box
                component="svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                sx={{
                    position:"absolute",
                    inset:0,
                    width:"100%",
                    height:"100%",
                }}>
                <path
                    d="
                    M0,0
                    L65,0
                    C55,30 45,70 35,100
                    L0,100
                    Z
                    "
                    fill="#F8FAFC"
                />
            </Box>

            {/* EFECTO GLOW */}

            <Box
                sx={{
                    position:"absolute",
                    width:420,
                    height:420,
                    borderRadius:"50%",
                    right:-120,
                    top:-100,
                    background:
                    `radial-gradient(
                        circle,
                        ${colors.primary.light}55,
                        transparent 70%
                    )`,
                    filter:"blur(20px)",
                }}
            />
            <Box
                sx={{
                    position:"relative",
                    zIndex:2,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"}}>
                {children}
            </Box>

        </Box>

    );

}