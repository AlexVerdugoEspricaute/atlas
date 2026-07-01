const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const jwksClients = { v1: null, v2: null };
function detectAzureVersion(token) {
    try {
        const decoded = jwt.decode(token, { complete: false });
        const iss = decoded?.iss || "";
        
        if (iss.includes("sts.windows.net")) {
            return "v1";
        } else if (iss.includes("login.microsoftonline.com")) {
            return "v2";
        }
        throw new Error(`Unknown issuer format: ${iss}`);
    } catch (err) {
        throw new Error(`Failed to detect Azure version: ${err.message}`);
    }
}

function getJwksClient(version) {
    if (!jwksClients[version]) {
        let jwksUri;
        
        if (version === "v1") {
            jwksUri = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/keys`;
        } else {
            jwksUri = `https://login.microsoftonline.com/common/discovery/v2.0/keys`;
        }
        
        jwksClients[version] = jwksClient({
            jwksUri,
            cache: true,
            cacheMaxEntries: 10,
            cacheMaxAge: 600000
        });
    }
    
    return jwksClients[version];
}

function getKey(header, callback, version) {
    const client = getJwksClient(version);
    
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(new Error(`Failed to get signing key: ${err.message}`));
        }

        const signingKey = key?.getPublicKey?.();

        if (!signingKey) {
            return callback(new Error("No signing key found"));
        }

        callback(null, signingKey);
    });
}

/**
 * Middleware de autenticación con validación de JWT de Azure AD
 * Soporta v1.0 y v2.0
 */
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ 
            message: "No valid bearer token provided",
            code: "AUTH_NO_TOKEN"
        });
    }

    const token = authHeader.slice(7);

    try {
        const version = detectAzureVersion(token);
        const decoded = jwt.decode(token, { complete: false });

        const verifyOptions = {
            audience: [
                process.env.AZURE_CLIENT_ID,
                "00000003-0000-0000-c000-000000000000"
            ],
            algorithms: ["RS256"],
            clockTimestamp: Math.floor(Date.now() / 1000)
        };

        if (version === "v1") {
            verifyOptions.issuer = `https://sts.windows.net/${process.env.AZURE_TENANT_ID}/`;
        } else {
            verifyOptions.issuer = [
                `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,
                `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/`
            ];
        }

        getKey({ kid: jwt.decode(token, { complete: true }).header.kid }, (err, signingKey) => {
            if (err) {
                return res.status(401).json({
                    message: "Failed to validate token signature",
                    code: "AUTH_SIGNATURE_INVALID"
                });
            }

            jwt.verify(token, signingKey, verifyOptions, (err, decodedToken) => {
                if (err) {
                    let httpMessage = err.message;
                    let errorCode = "AUTH_TOKEN_INVALID";
                    
                    if (err.name === "TokenExpiredError") {
                        httpMessage = "Token has expired";
                        errorCode = "AUTH_TOKEN_EXPIRED";
                    } else if (err.name === "JsonWebTokenError") {
                        if (err.message.includes("invalid audience")) {
                            httpMessage = "Invalid token audience";
                            errorCode = "AUTH_AUDIENCE_INVALID";
                        } else if (err.message.includes("invalid issuer")) {
                            httpMessage = "Invalid token issuer";
                            errorCode = "AUTH_ISSUER_INVALID";
                        } else if (err.message.includes("invalid signature")) {
                            httpMessage = "Invalid token signature";
                            errorCode = "AUTH_SIGNATURE_INVALID";
                        }
                    }
                    
                    return res.status(401).json({
                        message: httpMessage,
                        code: errorCode
                    });
                }

                req.user = {
                    id: decodedToken.sub || decodedToken.oid,
                    email: decodedToken.email || decodedToken.upn,
                    name: decodedToken.name,
                    roles: decodedToken.roles || [],
                    scopes: decodedToken.scp?.split(" ") || [],
                    azureOid: decodedToken.oid,
                    azureTid: decodedToken.tid
                };

                next();
            });
        }, version);

    } catch (err) {
        return res.status(401).json({
            message: "Token validation failed",
            code: "AUTH_VALIDATION_ERROR"
        });
    }
};

module.exports = authMiddleware;