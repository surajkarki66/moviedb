const { Favorite } = require("../models/favorite.model");

const favoriteNumberController = async (req, res) => {
  try {
    const result = await Favorite.find({ movieId: req.body.movieId });
    if (result) {
      res.status(200).json({ success: true, subscribeNumber: result.length });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const favoritedController = async (req, res) => {
  try {
    const subscribe = await Favorite.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    });
    if (subscribe) {
      let result = false;
      if (subscribe.length !== 0) {
        result = true;
      }

      res.status(200).json({ success: true, subscribed: result });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const addToFavoriteController = async (req, res) => {
  try {
    const favorite = new Favorite(req.body);
    const success = await favorite.save();
    if (success) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const removeFromFavoriteController = async (req, res) => {
  try {
    const result = await Favorite.findOneAndDelete({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    });
    if (result) {
      res.status(200).json({ success: true, result });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const getFavoritedMovieController = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userFrom: req.body.userFrom });
    if (favorites) {
      return res.status(200).json({ success: true, favorites });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  favoriteNumberController,
  favoritedController,
  addToFavoriteController,
  removeFromFavoriteController,
  getFavoritedMovieController,
};
