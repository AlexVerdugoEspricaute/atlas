import { Box } from "@mui/material";
import { colors } from "@/theme";


export default function NeonBorder({
    children,
    active = true,
    sx = {}
}) {

    return (
        <Box
            sx={{
                position:"relative",
                borderRadius:"20px",
                overflow:"hidden",
                "&::before":{
                    content:'""',
                    position:"absolute",
                    inset:0,
                    borderRadius:"inherit",
                    padding:"1px",
                    background:
                    active
                    ?
                    `linear-gradient(
                        135deg,
                        ${colors.primary.main},
                        transparent,
                        ${colors.primary.light}
                    )`
                    :
                    "transparent",
                    WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite:
                    "xor",
                    maskComposite:
                    "exclude",
                    pointerEvents:"none"
                },
                ...sx
            }}
        >
            {children}
        </Box>
    );
}