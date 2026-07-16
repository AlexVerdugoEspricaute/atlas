import { Box } from "@mui/material";


export default function GradientOverlay({
    children,
    sx={}
}) {

    return (
        <Box
            sx={{
                position:"relative",
                overflow:"hidden",
                "&::before":{
                    content:'""',
                    position:"absolute",
                    inset:0,
                    background:
                    `radial-gradient(
                        circle at top right,
                        rgba(193,18,31,.22),
                        transparent 45%
                    )`,
                    pointerEvents:"none"
                },
                ...sx
            }}
        >
            {children}
        </Box>
    );
}