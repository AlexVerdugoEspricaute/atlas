const router = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware");
const userSyncMiddleware = require("../middlewares/userSync.middleware");
const { generateToken } = require("../auth/jwt.service");

router.get(
    "/me",
    authMiddleware,
    userSyncMiddleware,
    (req, res) => {

        const token = generateToken(req.dbUser);

        res.json({
            token,
            user: req.dbUser
        });

    }
);

module.exports = router;