import MainLayout from "@/layouts/MainLayout";
import LoginButton from "@/components/auth/LoginButton";
import AuthHandler from "@/components/auth/AuthHandler";
import { Typography } from "@mui/material";

function App() {
    return (
        <MainLayout>
            <AuthHandler />
            <Typography variant="h4">
                Atlas Auth Test
            </Typography>

            <LoginButton />
        </MainLayout>
    );
}

export default App;