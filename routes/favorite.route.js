const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/auth");
const {
  favoriteNumberController,
  favoritedController,
  addToFavoriteController,
  removeFromFavoriteController,
  getFavoritedMovieController,
} = require("../controllers/favorite.controller");

// Define Route
router.post("/favoriteNumber", favoriteNumberController);
router.post("/favorited", favoritedController);
router.post("/addToFavorite", isAuth, addToFavoriteController);
router.post("/removeFromFavorite", isAuth, removeFromFavoriteController);
router.post("/getFavoritedMovie", isAuth, getFavoritedMovieController);

module.exports = router;
