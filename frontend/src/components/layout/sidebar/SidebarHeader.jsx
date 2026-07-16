import { Box, Typography } from "@mui/material";

export default function SidebarHeader() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2.5,
                pt: 2.5,
                pb: 2,
            }}
        >
            <Box
                sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg,#C1121F,#780000)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color: "#fff",
                    fontSize: 18,
                    boxShadow: "0 8px 25px rgba(193,18,31,.35)",
                }}
            >
                A
            </Box>

            <Box>
                <Typography fontWeight={800} fontSize={16}>
                    ATLAS
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Security Platform
                </Typography>
            </Box>
        </Box>
    );
}
