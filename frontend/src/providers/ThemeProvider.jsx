import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { colors, typography } from "@/theme";


const ThemeContext = createContext(null);

export function useThemeMode() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
            "useThemeMode must be used inside ThemeProvider"
        );
    }
    return context;
}

export default function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        const saved =
            localStorage.getItem("atlas_theme");
        return saved || "light";
    });

    const toggleTheme = () => {
        setMode((prev)=>{
            const next =
                prev === "light"
                    ? "dark"
                    : "light";
            localStorage.setItem(
                "atlas_theme",
                next
            );
            return next;
        });
    };

    const theme = useMemo(()=>{
        return createTheme({
            palette: {
                mode,
                primary:{
                    main:
                    colors.primary.main,
                    light:
                    colors.primary.light,
                    dark:
                    colors.primary.dark
                },
                background:{
                    default:
                    mode === "light"
                    ? colors.background.light
                    : colors.background.dark,
                    paper:
                    mode === "light"
                    ? colors.background.paper
                    : colors.background.darkPaper
                },
                text:{
                    primary:
                    mode === "light"
                    ? colors.text.primary
                    : colors.text.darkPrimary,
                    secondary:
                    mode === "light"
                    ? colors.text.secondary
                    : colors.text.darkSecondary
                }
            },
            typography:{
                fontFamily:
                typography.fontFamily,
                button:{
                    textTransform:"none",
                    fontWeight:600
                }
            },
            shape:{
                borderRadius:16
            },
            components:{
                MuiCssBaseline:{
                    styleOverrides:{
                        body:{
                            transition:
                            "background .3s ease,color .3s ease"
                        }
                    }
                }
            }
        });
    },[mode]);

    return (
        <ThemeContext.Provider
            value={{
                mode,
                toggleTheme
            }}
        >
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}