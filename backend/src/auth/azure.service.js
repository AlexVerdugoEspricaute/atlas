let jose;

const getJose = async () => {
    if (!jose) {
        jose = await import("jose");
    }

    return jose;
};

const clientId = process.env.AZURE_CLIENT_ID;


const getJWKS = async () => {
    const { createRemoteJWKSet } = await getJose();

    return createRemoteJWKSet(
        new URL(
            "https://login.microsoftonline.com/common/discovery/v2.0/keys"
        )
    );
};


const validateAzureToken = async (token) => {
    const { jwtVerify } = await getJose();

    const keySet = await getJWKS();


    const { payload } = await jwtVerify(token, keySet, {
        audience: clientId
    });


    return payload;
};


module.exports = {
    validateAzureToken
};