import { Box } from "@mui/material";

export default function IconBadge({
    children,
    color = "primary.main",
}) {
    return (
        <Box
            sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color,
                backgroundColor:
                    `${color}18`,
                transition:
                    "all .25s ease",

                "& svg": {
                    fontSize: 24,
                },

                "&:hover": {
                    transform:
                        "translateY(-3px)",

                    boxShadow:
                        `0 0 18px ${color}45`,
                },
            }}
        >
            {children}
        </Box>
    );
}