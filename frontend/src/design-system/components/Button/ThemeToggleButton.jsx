import {
    IconButton,
    Tooltip,
} from "@mui/material";

import {
    useTheme,
} from "@mui/material/styles";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import {
    useThemeMode,
} from "@/providers";


export default function ThemeToggleButton() {
    const theme = useTheme();
    const {
        mode,
        toggleTheme,
    } = useThemeMode();

    const isLight =
        mode === "light";

    return (
        <Tooltip
            title={
                isLight
                    ? "Modo oscuro"
                    : "Modo claro"
            }
        >
            <IconButton
                onClick={toggleTheme}
                sx={{
                    width: 42,
                    height: 42,
                    border:
                        "1px solid",
                    borderColor:
                        "divider",
                    color:
                        "text.primary",
                    transition:
                        "all .3s ease",
                    "&:hover": {
                        color:
                            "primary.main",
                        borderColor:
                            "primary.main",
                        bgcolor:
                            "rgba(193,18,31,.08)",
                        boxShadow:
                            `0 0 18px ${theme.palette.primary.main}40`,
                        transform:
                            "translateY(-2px)",
                    },
                }}
            >
                {
                    isLight
                        ?
                    <DarkModeOutlinedIcon />
                        :
                    <LightModeOutlinedIcon />
                }
            </IconButton>
        </Tooltip>
    );
}