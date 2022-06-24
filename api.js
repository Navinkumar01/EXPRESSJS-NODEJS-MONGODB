const express = require("express");

const { usersController } = require("./user.js");

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.get("/:userId", usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/:userId", usersController.updateUser);
router.delete("/:userId", usersController.deleteUser);

module.exports = router