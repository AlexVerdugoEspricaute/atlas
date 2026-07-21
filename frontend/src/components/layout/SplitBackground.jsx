import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SplitBackground({children}) {
    const theme=useTheme();
    const dark=theme.palette.mode==="dark";

    return(
        <Box
            sx={{
                minHeight:"100vh",
                width:"100%",
                position:"relative",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                overflow:"hidden",
                background:dark
                ?`linear-gradient(135deg,#080B12,#111827,#780000)`
                :`linear-gradient(135deg,#780000,#C1121F)`,
                transition:"all .35s ease",
            }}
        >
            <Box
                component="svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                sx={{
                    position:"absolute",
                    inset:0,
                    width:"100%",
                    height:"100%",
                }}
            >
                <path
                    d="
                    M0,0
                    L65,0
                    C55,30 45,70 35,100
                    L0,100
                    Z
                    "
                    fill={theme.palette.background.default}
                />
            </Box>

            <Box
                sx={{
                    position:"absolute",
                    width:420,
                    height:420,
                    borderRadius:"50%",
                    right:-120,
                    top:-100,
                    background:dark
                    ?"radial-gradient(circle, rgba(193,18,31,.28), transparent 70%)"
                    :"radial-gradient(circle, rgba(230,57,70,.35), transparent 70%)",
                    filter:"blur(30px)",
                }}
            />

            <Box
                sx={{
                    position:"relative",
                    zIndex:2,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}