const express = require("express");

const router = express.Router();

const jwtMiddleware = require("../../../auth/jwt.middleware");
const userSyncMiddleware = require("../../../middlewares/userSync.middleware");

const { requireRole } = require("../../../middlewares/role.middleware");

const { requireSelfOrAdmin } = require("../../../middlewares/ownership.middleware");

const usersController = require("../controllers/users.controller");

const {
    validateCreateUser,
    validateUpdateUser
} = require("../validators/users.validator");


// GET ALL USERS
router.get(
    "/",
    jwtMiddleware,
    userSyncMiddleware,
    requireRole("admin"),
    usersController.getUsers
);

// GET USER BY ID
router.get(
    "/:id",
    jwtMiddleware,
    userSyncMiddleware,
    requireSelfOrAdmin,
    usersController.getUserById
);

// CREATE USER
router.post(
    "/",
    jwtMiddleware,
    userSyncMiddleware,
    requireRole("admin"),
    validateCreateUser,
    usersController.createUser
);

// UPDATE USER
router.put(
    "/:id",
    jwtMiddleware,
    userSyncMiddleware,
    requireSelfOrAdmin,
    validateUpdateUser,
    usersController.updateUser
);

// DELETE USER
router.delete(
    "/:id",
    jwtMiddleware,
    userSyncMiddleware,
    requireRole("admin"),
    usersController.deleteUser
);

module.exports = router;