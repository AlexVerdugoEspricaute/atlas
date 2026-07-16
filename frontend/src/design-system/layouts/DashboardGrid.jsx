import {
    Box,
} from "@mui/material";


export default function DashboardGrid({
    children,
    sx = {},
}) {

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(12, 1fr)",
                },
                gap: 3,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}