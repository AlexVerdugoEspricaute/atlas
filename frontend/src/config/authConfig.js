import { PublicClientApplication } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID;

export const msalConfig = {
    auth: {
        clientId,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            logLevel: "Error",
            piiLoggingEnabled: false,
        },
    },
};

export const loginRequest = {
    scopes: [
        "openid",
        "profile",
        "email",
        "User.Read"
    ]
};

export const msalInstance = new PublicClientApplication(msalConfig);