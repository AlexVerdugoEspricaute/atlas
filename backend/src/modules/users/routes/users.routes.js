const express = require("express");
const router = express.Router();

const jwtMiddleware = require("../../../auth/jwt.middleware");
const usersController = require("../controllers/users.controller");

// GET ALL (protegido)
router.get("/", jwtMiddleware, (req, res) => {
    return res.json({
        user: req.user
    });
});

// GET BY ID
router.get("/:id", jwtMiddleware, usersController.getUserById);

// CREATE
router.post("/", jwtMiddleware, usersController.createUser);

// UPDATE
router.put("/:id", jwtMiddleware, usersController.updateUser);

// DELETE
router.delete("/:id", jwtMiddleware, usersController.deleteUser);



module.exports = router;