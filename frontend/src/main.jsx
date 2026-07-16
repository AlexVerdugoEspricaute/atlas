import "./styles/variables.css";
import "./styles/auth.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";

import CssBaseline from "@mui/material/CssBaseline";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/config/authConfig";

import { AuthProvider } from "@/store/AuthContext";
import { ThemeProvider } from "@/providers";


ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <AuthProvider>
                <ThemeProvider>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </MsalProvider>
    </React.StrictMode>
);