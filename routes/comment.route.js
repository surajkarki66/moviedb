const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/auth");
const {
  saveCommentController,
  getCommentController,
} = require("../controllers/comment.controller");

// Define Route
router.post("/save", isAuth, saveCommentController);
router.post("/comments", getCommentController);

module.exports = router;
