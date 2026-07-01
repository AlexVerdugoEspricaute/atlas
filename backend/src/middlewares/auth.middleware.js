const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
    jwksUri: `${process.env.AZURE_ISSUER}/discovery/v2.0/keys`
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        getKey,
        {
            audience: process.env.AZURE_CLIENT_ID,
            issuer: process.env.AZURE_ISSUER
        },
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            req.user = decoded;
            next();
        }
    );
};

module.exports = authMiddleware;