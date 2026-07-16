import { Box, useTheme } from "@mui/material";

export default function AtlasCard({
    children,
    sx = {},
    hover = true
}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position:"relative",
                borderRadius:"16px",
                backgroundColor:
                    theme.palette.background.paper,
                border:
                    `1px solid ${theme.palette.divider}`,
                boxShadow:
                    theme.palette.mode === "dark"
                    ? "0 8px 30px rgba(0,0,0,.35)"
                    : "0 1px 3px rgba(0,0,0,.08)",
                p:{
                    xs:2,
                    md:2.5,
                },
                transition:
                    "all .25s ease",
                ...(hover && {
                    "&:hover":{
                        transform:
                            "translateY(-2px)",
                        boxShadow:
                            theme.palette.mode === "dark"
                            ? "0 12px 35px rgba(0,0,0,.5)"
                            : "0 10px 24px rgba(0,0,0,.10)",
                    }
                }),
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}