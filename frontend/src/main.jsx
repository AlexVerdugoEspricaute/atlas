import "./styles/variables.css";
import "./styles/auth.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/theme";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/config/authConfig";
import { AuthProvider } from "@/store/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </MsalProvider>
    </React.StrictMode>
);
