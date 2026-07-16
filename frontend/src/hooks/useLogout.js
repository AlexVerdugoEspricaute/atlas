import { useMsal } from "@azure/msal-react";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/store/AuthContext";

import {
    showLoadingOverlay,
    closeAlerts
} from "@/utils/alerts";

export default function useLogout() {

    const { logout } = useAuth();
    const { instance } = useMsal();
    const theme = useTheme();

    const handleLogout = async () => {

        const result = await Swal.fire({
            background: theme.palette.background.paper,

            html: `
                <div style="
                    text-align:center;
                    padding:0.5rem 0;
                ">
                    <div style="
                        width:60px;
                        height:60px;
                        border-radius:50%;
                        background:${theme.palette.action.hover};
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        margin:0 auto 1rem;
                    ">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="28"
                            height="28"
                            fill="${theme.palette.primary.main}"
                        >
                            <path d="
                                M17 7
                                l-1.41 1.41
                                L18.17 11
                                H8
                                v2
                                h10.17
                                l-2.58 2.58
                                L17 17
                                l5-5z
                                M4 5h8V3H4
                                c-1.1 0-2 .9-2 2v14
                                c0 1.1.9 2 2 2h8
                                v-2H4V5z
                            "/>
                        </svg>
                    </div>
                    <h2 style="
                        font-size:1.2rem;
                        font-weight:700;
                        color:${theme.palette.text.primary};
                        margin:0 0 .5rem;
                    ">
                        ¿Cerrar sesión?
                    </h2>
                    <p style="
                        font-size:.875rem;
                        color:${theme.palette.text.secondary};
                        margin:0;
                    ">
                        Serás redirigido al inicio de sesión.
                    </p>
                </div>
            `,
            showCancelButton:true,
            confirmButtonText:"Sí, cerrar sesión",
            cancelButtonText:"Cancelar",
            buttonsStyling:false,
            reverseButtons:true,
            customClass:{
                popup:"atlas-logout-popup",
                actions:"atlas-logout-actions",
                confirmButton:"atlas-logout-confirm-btn",
                cancelButton:"atlas-logout-cancel-btn",
            },
            showClass:{
                popup:"animate__animated animate__fadeInDown animate__faster"
            },
            hideClass:{
                popup:"animate__animated animate__fadeOutUp animate__faster"
            }
        });

        if(!result.isConfirmed) return;

        showLoadingOverlay("Cerrando sesión...");
        try {
            const accounts = instance.getAllAccounts();
            logout();
            if(accounts.length > 0){
                await instance.logoutRedirect({
                    account: accounts[0],
                });
            } else {
                closeAlerts();
                window.location.href="/login";
            }
        } catch(error){
            console.error("LOGOUT ERROR:", error);
            logout();
            closeAlerts();
            window.location.href="/login";
        }
    };
    return {
        handleLogout
    };
}