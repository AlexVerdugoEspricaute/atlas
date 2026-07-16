import {
    PublicClientApplication
} from "@azure/msal-browser";



const clientId =
    import.meta.env.VITE_AZURE_CLIENT_ID;



const tenantId =
    import.meta.env.VITE_AZURE_TENANT_ID;





if(!clientId){

    console.error(
        "Falta VITE_AZURE_CLIENT_ID en el archivo .env"
    );

}


if(!tenantId){

    console.error(
        "Falta VITE_AZURE_TENANT_ID en el archivo .env"
    );

}


export const msalConfig = {

    auth:{

        clientId,


        authority:
        `https://login.microsoftonline.com/${tenantId || "common"}`,



        redirectUri:
            window.location.origin,



        postLogoutRedirectUri:
            window.location.origin,


    },

    cache:{

        cacheLocation:
            "localStorage",

        storeAuthStateInCookie:
            false,

    },


    system:{

        allowNativeBroker:
            false,

        loggerOptions:{

            loggerCallback:(
                level,
                message,
                containsPii
            )=>{

                if(containsPii)
                    return;

                if(
                    level === "Error"
                ){

                    console.error(
                        message
                    );

                }

            },

            piiLoggingEnabled:
                false,

        },

    },

};

/*
    Permisos solicitados
    durante login Microsoft
*/

export const loginRequest = {

    scopes:[

        "openid",

        "profile",

        "email",

        "User.Read"

    ],


};

/*
    Instancia global MSAL
*/

export const msalInstance =

    new PublicClientApplication(
        msalConfig
    );