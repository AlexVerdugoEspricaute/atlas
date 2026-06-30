const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

// GET ALL
router.get("/", usersController.getUsers);

// GET BY ID
router.get("/:id", usersController.getUserById);

// CREATE
router.post("/", usersController.createUser);

// UPDATE
router.put("/:id", usersController.updateUser);

// DELETE
router.delete("/:id", usersController.deleteUser);

module.exports = router;