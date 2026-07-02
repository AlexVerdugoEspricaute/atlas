import { Box, Button, Chip, Typography } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useAuth } from "@/store/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const { instance } = useMsal();

    const handleLogout = () => {
        logout();
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            instance.logoutRedirect({ account: accounts[0] });
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={700} mb={1}>
                Bienvenido, {user?.first_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                {user?.email}
            </Typography>
            <Chip
                label={user?.provider === "microsoft" ? "Microsoft" : "Local"}
                color={user?.provider === "microsoft" ? "primary" : "default"}
                size="small"
                sx={{ mb: 3 }}
            />
            <Box>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>
        </Box>
    );
}
