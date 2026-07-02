const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token required"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }
};

module.exports = jwtMiddleware;