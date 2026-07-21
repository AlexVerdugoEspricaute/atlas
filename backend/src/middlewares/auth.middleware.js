const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const jwksClients = {
    v1:null,
    v2:null
};

function detectAzureVersion(token){
    try{
        const decoded =
            jwt.decode(token,{complete:false});
        const iss =
            decoded?.iss || "";
        if(iss.includes("sts.windows.net")){
            return "v1";
        }
        if(iss.includes("login.microsoftonline.com")){
            return "v2";
        }
        throw new Error(
            `Unknown issuer format: ${iss}`
        );
    }catch(error){
        throw new Error(
            `Failed to detect Azure version: ${error.message}`
        );
    }
}


function getJwksClient(version){
    if(!jwksClients[version]){
        let jwksUri;
        if(version==="v1"){
            jwksUri =
            `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/keys`;
        }else{
            jwksUri =
            `https://login.microsoftonline.com/common/discovery/v2.0/keys`;
        }
        jwksClients[version] =
            jwksClient({
                jwksUri,
                cache:true,
                cacheMaxEntries:10,
                cacheMaxAge:600000
            });
    }
    return jwksClients[version];
}


function getKey(header,callback,version){
    const client =
        getJwksClient(version);
    client.getSigningKey(
        header.kid,
        (error,key)=>{
            if(error){
                return callback(
                    new Error(
                        "Signing key not found"
                    )
                );
            }
            const signingKey =
                key.getPublicKey();
            callback(
                null,
                signingKey
            );
        }
    );
}


const authMiddleware = (req,res,next)=>{
    const authHeader =
        req.headers.authorization;
    if(
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ){
        return res.status(401).json({
            message:"Token required",
            code:"AUTH_NO_TOKEN"
        });
    }

    const token =
        authHeader.substring(7);
    try{
        const version =
            detectAzureVersion(token);
        const completeToken =
            jwt.decode(
                token,
                {
                    complete:true
                }
            );
        if(!completeToken?.header?.kid){
            return res.status(401).json({
                message:"Invalid token",
                code:"AUTH_INVALID_TOKEN"
            });
        }

        const verifyOptions = {
            audience:[
                process.env.AZURE_CLIENT_ID,
                "00000003-0000-0000-c000-000000000000"
            ],
            algorithms:[
                "RS256"
            ],
            clockTimestamp:
                Math.floor(
                    Date.now()/1000
                )
        };
        if(version==="v1"){
            verifyOptions.issuer =
            `https://sts.windows.net/${process.env.AZURE_TENANT_ID}/`;

        }else{
            verifyOptions.issuer=[
                `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,
                `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/`
            ];
        }
        getKey(
            completeToken.header,
            (error,signingKey)=>{
                if(error){
                    return res.status(401).json({
                        message:"Invalid token signature",
                        code:"AUTH_SIGNATURE_INVALID"
                    });
                }
                jwt.verify(
                    token,
                    signingKey,
                    verifyOptions,
                    (error,decoded)=>{
                        if(error){
                            return res.status(401).json({
                                message:"Invalid or expired token",
                                code:"AUTH_TOKEN_INVALID"
                            });
                        }
                        req.user={
                            azureOid:
                                decoded.oid,
                            email:
                                (
                                    decoded.email ||
                                    decoded.preferred_username ||
                                    decoded.upn
                                )?.toLowerCase(),
                            name:
                                decoded.name || "",
                            roles:
                                decoded.roles || [],
                            scopes:
                                decoded.scp
                                ?
                                decoded.scp.split(" ")
                                :
                                [],
                            tenantId:
                                decoded.tid
                        };

                        next();
                    }
                );
            },
            version
        );
    }catch(error){
        return res.status(401).json({
            message:"Token validation failed",
            code:"AUTH_VALIDATION_ERROR"
        });
    }
};

module.exports = authMiddleware;