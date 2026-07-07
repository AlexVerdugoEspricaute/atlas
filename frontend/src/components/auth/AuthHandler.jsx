import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import {
    InteractionRequiredAuthError,
    EventType,
    InteractionStatus
} from "@azure/msal-browser";

import { loginRequest } from "@/config/authConfig";
import { loginWithMicrosoft } from "@/services/auth.service";
import { useAuth } from "@/store/AuthContext";

const AuthHandler = () => {
    const { instance, accounts, inProgress } = useMsal();
    const { login, isAuthenticated, setIsLoading, setAuthError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const callbackId = instance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_FAILURE) {
                setAuthError(
                    event.error?.message || "Error iniciando sesión con Microsoft"
                );
                setIsLoading(false);
            }
        });
        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, [instance, setAuthError, setIsLoading]);


    useEffect(() => {
        if (
            !accounts.length ||
            isAuthenticated ||
            inProgress !== InteractionStatus.None
        ) {
            return;
        }

        const authenticate = async () => {
            try {
                setIsLoading(true);
                const response = await instance.acquireTokenSilent({
                    account: accounts[0],
                    scopes: loginRequest.scopes
                });

                const { token, user } =
                    await loginWithMicrosoft(response.idToken);
                login(token, user);
                navigate("/", { replace: true });
            } catch (error) {
                console.error(
                    "[AUTH_HANDLER ERROR]",
                    error
                );
                if (error instanceof InteractionRequiredAuthError) {
                    instance.loginRedirect({
                        ...loginRequest,
                        prompt: "select_account"
                    });
                    return;
                }
                setAuthError(
                    error.message || "Error autenticando usuario"
                );
            } finally {
                setIsLoading(false);
            }
        };
        authenticate();
    }, [
        accounts,
        instance,
        inProgress,
        isAuthenticated,
        login,
        navigate,
        setIsLoading,
        setAuthError
    ]);

    return null;
};

export default AuthHandler;