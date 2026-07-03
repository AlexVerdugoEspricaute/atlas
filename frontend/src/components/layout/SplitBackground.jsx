import { Box } from "@mui/material";

export default function SplitBackground({ children }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#880022",
                overflow: "hidden",
            }}
        >
            {/* Área blanca con curva diagonal */}
            <Box
                component="svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            >
                <path
                    d="M0,0 L60,0 C55,35 45,65 40,100 L0,100 Z"
                    fill="#F8F7F5"
                />
            </Box>

            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}