import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AtlasButton({
    children,
    variant = "primary",
    sx = {},
    ...props
}) {

    const theme = useTheme();

    const variants = {

        primary: {
            bgcolor: "primary.main",
            color: "#fff",
            "&:hover": {
                bgcolor: "primary.dark",
                boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
            },
            "&:disabled": {
                bgcolor: "action.disabledBackground",
                color: "action.disabled",
            },
        },
        outline: {
            border: "1px solid",
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
                bgcolor: "action.hover",
                borderColor: "primary.dark",
            },
        },
            microsoft: {
            bgcolor: "background.paper",
            color: "text.primary",
            border: "2px solid",
            borderColor: "primary.main",
            "&:hover": {
                bgcolor: "action.hover",
                borderColor: "primary.dark",
                boxShadow: `0 0 20px ${theme.palette.primary.main}25`,
            },
        },
        text: {
            color: "primary.main",
            "&:hover": {
                bgcolor: "action.hover",
            },
        },
    };

    return (
        <Button
            {...props}
            sx={{
                py: 1.2,
                px: 3,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                fontSize: ".95rem",
                transition: "all .25s ease",
                ...variants[variant],
                ...sx,
            }}
        >
            {children}
        </Button>
    );
}