import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/config/authConfig";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </MsalProvider>
    </React.StrictMode>
);