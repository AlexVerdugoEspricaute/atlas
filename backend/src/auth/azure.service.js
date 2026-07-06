let jose;

const getJose = async () => {
    if (!jose) {
        jose = await import("jose");
    }
    return jose;
};

const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;

const JWKS = async () => {
    const { createRemoteJWKSet } = await getJose();

    return createRemoteJWKSet(
        new URL(`https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`)
    );
};

const validateAzureToken = async (token) => {
    const { jwtVerify } = await getJose();
    const keySet = await JWKS();

    const { payload } = await jwtVerify(token, keySet, {
        issuer: [
            `https://login.microsoftonline.com/${tenantId}/v2.0`,
            "https://login.microsoftonline.com/common/v2.0"
        ],
        audience: clientId
    });

    return payload;
};

module.exports = { validateAzureToken };