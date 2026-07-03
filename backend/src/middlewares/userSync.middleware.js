const { findOrCreateUser } = require("../modules/users/services/users.service");

const userSyncMiddleware = async (req, res, next) => {
    try {
        const dbUser = await findOrCreateUser(req.user);
        req.dbUser = dbUser;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "User sync error",
            error: error.message
        });
    }
};

module.exports = userSyncMiddleware;