const { jwtVerify, createRemoteJWKSet } = require("jose");

const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;

const JWKS = createRemoteJWKSet(
    new URL(`https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`)
);

const validateAzureToken = async (token) => {
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
        audience: clientId,
    });

    return payload;
};

module.exports = { validateAzureToken };