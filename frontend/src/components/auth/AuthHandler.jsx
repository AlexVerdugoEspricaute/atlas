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
                    scopes: loginRequest.scopes
                });

                const idToken = response.idToken;

                console.log("[AUTH_HANDLER] ID TOKEN:", idToken);

                localStorage.setItem("token", idToken);

                const user = await fetchMe(idToken);

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