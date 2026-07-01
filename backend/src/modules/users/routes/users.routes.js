const express = require("express");
const router = express.Router();
const auth = require("../../../middlewares/auth.middleware");
const usersController = require("../controllers/users.controller");

// GET ALL
router.get("/", auth, usersController.getUsers);

// GET BY ID
router.get("/:id", auth, usersController.getUserById);

// CREATE
router.post("/", auth, usersController.createUser);

// UPDATE
router.put("/:id", auth, usersController.updateUser);

// DELETE
router.delete("/:id", auth, usersController.deleteUser);

module.exports = router;