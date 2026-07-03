import { Divider, Typography } from "@mui/material";

export default function MicrosoftDivider() {
    return (
        <Divider sx={{ my: 2 }}>
            <Typography
                variant="caption"
                sx={{ color: "#9ca3af" }}
            >
                o continúa con email
            </Typography>
        </Divider>
    );
}