import {
    Box,
    Typography
} from "@mui/material";

import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

import { useTheme } from "@mui/material/styles";

export default function SidebarLogo({
    collapsed
}){
    const theme = useTheme();

    return(
        <Box
            sx={{
                display:"flex",
                alignItems:"center",
                gap:2,
                px:2.5,
                py:2.5,
                minHeight:80,
                overflow:"hidden"
            }}
        >
            <Box
                sx={{
                    width:46,
                    height:46,
                    borderRadius:"14px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    flexShrink:0,
                    background:
                    `linear-gradient(
                        135deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.primary.dark}
                    )`,
                    color:"#fff",
                    boxShadow:
                    `0 10px 30px ${theme.palette.primary.main}30`
                }}
            >

                <ShieldOutlinedIcon/>

            </Box>
            {
                !collapsed && (
                    <Box
                        sx={{
                            overflow:"hidden"
                        }}
                    >

                        <Typography
                            fontWeight={900}
                            fontSize={18}
                            noWrap
                        >
                            ATLAS
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                        >
                            Security Platform
                        </Typography>
                    </Box>
                )
            }
        </Box>
    );
}