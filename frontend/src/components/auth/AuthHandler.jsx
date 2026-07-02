import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError, EventType } from "@azure/msal-browser";
import { loginRequest } from "@/config/authConfig";
import { loginWithMicrosoft } from "@/services/auth.service";
import { useAuth } from "@/store/AuthContext";

const AuthHandler = () => {
    const { instance, accounts, inProgress } = useMsal();
    const { login, isAuthenticated, setIsLoading, setAuthError } = useAuth();
    const navigate = useNavigate();

    // ── Listener de eventos MSAL (diagnóstico + flujo de redirect) ─────────────
    useEffect(() => {
        const id = instance.addEventCallback((event) => {
            console.log("[MSAL_EVENT]", event.eventType, event.error ?? "");

            if (event.eventType === EventType.LOGIN_FAILURE) {
                console.error("[MSAL_EVENT] LOGIN_FAILURE:", event.error?.errorCode, event.error?.message);
                setAuthError(event.error?.message || "Error al iniciar sesión con Microsoft");
                setIsLoading(false);
            }
        });
        return () => { if (id) instance.removeEventCallback(id); };
    }, [instance, setAuthError, setIsLoading]);

    // ── Intercambio de token tras redirect ─────────────────────────────────────
    useEffect(() => {
        console.log("[AUTH_HANDLER] accounts:", accounts.length, "| inProgress:", inProgress, "| isAuth:", isAuthenticated);

        if (!accounts.length || isAuthenticated) return;

        setIsLoading(true);

        const runAuth = async () => {
            try {
                console.log("[AUTH_HANDLER] acquireTokenSilent...");
                const response = await instance.acquireTokenSilent({
                    account: accounts[0],
                    scopes: loginRequest.scopes,
                    forceRefresh: true,
                });

                console.log("[AUTH_HANDLER] idToken obtenido, enviando al backend...");
                const { token, user } = await loginWithMicrosoft(response.idToken);
                console.log("[AUTH_HANDLER] Backend OK, user:", user?.email);
                login(token, user);
                navigate("/", { replace: true });
            } catch (err) {
                if (err instanceof InteractionRequiredAuthError) {
                    console.warn("[AUTH_HANDLER] InteractionRequired, redirigiendo a Microsoft...");
                    instance.loginRedirect(loginRequest);
                    return;
                }
                const msg = err?.message || err?.detail || "Error al iniciar sesión con Microsoft";
                console.error("[AUTH_HANDLER] Error:", err);
                setAuthError(msg);
            } finally {
                setIsLoading(false);
            }
        };

        runAuth();
    }, [accounts, instance, inProgress, isAuthenticated, login, setIsLoading, setAuthError, navigate]);

    return null;
};

export default AuthHandler;

