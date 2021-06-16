const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/auth");
const {
  favouriteNumberController,
  favouritedController,
  addToFavouriteController,
  removeFromFavouriteController,
  getFavouritedMovieController,
} = require("../controllers/favourite.controller");

// Define Route
router.post("/favouriteNumber", favouriteNumberController);
router.post("/favourited", favouritedController);
router.post("/addToFavourite", addToFavouriteController);
router.post("/removeFromFavourite", removeFromFavouriteController);
router.post("/getFavouritedMovie", getFavouritedMovieController);

module.exports = router;
