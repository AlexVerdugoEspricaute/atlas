import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/authConfig";
import { fetchMe } from "@/services/auth.service";

const AuthHandler = () => {
    const { instance, accounts } = useMsal();

    useEffect(() => {
        const runAuth = async () => {
            if (!accounts.length) return;

            try {
                const response = await instance.acquireTokenSilent({
                    account: accounts[0],
                    scopes: loginRequest.scopes,
                });

                const idToken = response.idToken;

                console.log("[AUTH_HANDLER] ID TOKEN:", idToken);

                // enviar al backend
                const backendResponse = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_token: idToken,
                    }),
                });

                const data = await backendResponse.json();

                console.log("[AUTH_HANDLER] Backend response:", data);

                // guardar sesión Atlas
                localStorage.setItem("atlas_token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // usar sesión Atlas
                const user = await fetchMe(data.token);

                console.log("[AUTH_HANDLER] User:", user);

                console.log("[AUTH_HANDLER] Backend response:", user);
            } catch (err) {
                console.error("[AUTH_HANDLER]", err);
            }
        };

        runAuth();
    }, [accounts, instance]);

    return null;
};

export default AuthHandler;
