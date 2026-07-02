const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const jwtMiddleware = require("../../../auth/jwt.middleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", jwtMiddleware, authController.me);

module.exports = router;