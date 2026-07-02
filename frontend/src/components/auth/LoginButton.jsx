import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/authConfig";
import { Button } from "@mui/material";

const LoginButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest);
    };

    return (
        <Button
            variant="contained"
            onClick={handleLogin}
        >
            Login con Microsoft
        </Button>
    );
};

export default LoginButton;