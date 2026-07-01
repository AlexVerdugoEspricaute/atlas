const { findOrCreateUser } = require("../modules/users/services/users.service")

const userSyncMiddleware = async (req, res, next) => {
    try {
        // req.user viene de TU auth.middleware (Azure AD)
        const azureUser = req.user

        const dbUser = await findOrCreateUser(azureUser)

        // guardamos usuario de Supabase aquí
        req.dbUser = dbUser

        next()
    } catch (error) {
        return res.status(500).json({
            message: "Error syncing user with database",
            error: error.message
        })
    }
}

module.exports = userSyncMiddleware