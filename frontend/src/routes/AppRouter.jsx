import { Routes, Route, Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { Box, CircularProgress } from "@mui/material";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";

import { useAuth } from "@/store/AuthContext";


export default function AppRouter() {
    const { isAuthenticated, isLoading } = useAuth();
    const { inProgress, accounts } = useMsal();

    const msalPending = inProgress !== InteractionStatus.None;
    const authHandlerPending =
        accounts.length > 0 && !isAuthenticated;

    if (msalPending || isLoading || authHandlerPending) {
        return (
            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    minHeight:"100vh"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            <Route element={<PrivateRoute />}>
                <Route
                    path="/"
                    element={<Dashboard />}
                />
            </Route>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}