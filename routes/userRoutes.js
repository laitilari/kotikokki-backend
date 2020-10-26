const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllChefs
} = require("../controllers/userController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/").get(getAllChefs).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
