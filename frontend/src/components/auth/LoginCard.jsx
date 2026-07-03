import { Box } from "@mui/material";

export default function LoginCard({ children }) {
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 420,
                p: 4,
                borderRadius: 4,

                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(10px)",

                boxShadow: "0 25px 70px rgba(0,0,0,0.15)",
                border: "1px solid rgba(0,0,0,0.05)",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {children}
        </Box>
    );
}