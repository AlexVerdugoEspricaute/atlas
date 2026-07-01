const router = require("express").Router()

const authMiddleware = require("../middlewares/auth.middleware")
const userSyncMiddleware = require("../middlewares/userSync.middleware")

router.get("/me",
    authMiddleware,
    userSyncMiddleware,
    (req, res) => {
        res.json({
            azure: req.user,
            db: req.dbUser
        })
    }
)

module.exports = router