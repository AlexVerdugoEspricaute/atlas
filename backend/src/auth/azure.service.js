const jwt = require("jsonwebtoken");


// Cache de clientes JWKS por versión de Azure AD
const jwksClients = {};

function detectVersion(token) {
    const decoded = jwt.decode(token, { complete: false });
    const iss = decoded?.iss || "";
    if (iss.includes("sts.windows.net")) return "v1";
    if (iss.includes("login.microsoftonline.com")) return "v2";
    throw new Error(`Unknown Azure issuer: ${iss}`);
}

function getJwksClient(version) {
    if (!jwksClients[version]) {
        const jwksUri =
            version === "v1"
                ? `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/keys`
                : `https://login.microsoftonline.com/common/discovery/v2.0/keys`;

        jwksClients[version] = jwksClient({
            jwksUri,
            cache: true,
            cacheMaxEntries: 10,
            cacheMaxAge: 600000,
        });
    }
    return jwksClients[version];
}

/**
 * Valida un id_token de Azure AD y retorna el payload decodificado.
 * @param {string} token
 * @returns {Promise<{ oid: string, email: string, name: string }>}
 */
const validateAzureToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const version = detectVersion(token);
            const header = jwt.decode(token, { complete: true })?.header;

            if (!header?.kid) {
                return reject(new Error("Token missing kid"));
            }

            const client = getJwksClient(version);

            client.getSigningKey(header.kid, (err, key) => {
                if (err) return reject(new Error(`JWKS error: ${err.message}`));

                const signingKey = key?.getPublicKey?.();
                if (!signingKey) return reject(new Error("No signing key found"));

                const issuer =
                    version === "v1"
                        ? `https://sts.windows.net/${process.env.AZURE_TENANT_ID}/`
                        : `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`;

                jwt.verify(
                    token,
                    signingKey,
                    {
                        audience: process.env.AZURE_CLIENT_ID,
                        issuer,
                        algorithms: ["RS256"],
                    },
                    (err, decoded) => {
                        if (err) return reject(err);
                        resolve(decoded);
                    }
                );
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { validateAzureToken };
