const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/auth");
const {
  registerController,
  loginController,
  me,
} = require("../controllers/user.controller");

// Define Route
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", isAuth, me);

module.exports = router;
