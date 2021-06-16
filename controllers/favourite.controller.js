const { Favourite } = require("../models/favourite.model");

const favouriteNumberController = async (req, res) => {
  try {
    const result = await Favourite.find({ movieId: req.body.movieId });
    if (result) {
      res.status(200).json({ success: true, subscribeNumber: result.length });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const favouritedController = async (req, res) => {
  try {
    const subscribe = await Favourite.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    });
    if (subscribe) {
      let result = false;
      if (subscribe.length !== 0) {
        result = true;
      }

      res.status(200).json({ success: true, subcribed: result });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const addToFavouriteController = async (req, res) => {
  try {
    const favourite = new Favourite(req.body);
    const success = await favourite.save();
    if (success) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const removeFromFavouriteController = async (req, res) => {
  try {
    const result = await Favourite.findOneAndDelete({
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

const getFavouritedMovieController = async (req, res) => {
  try {
    const favourites = await Favourite.find({ userFrom: req.body.userFrom });
    if (favourites) {
      return res.status(200).json({ success: true, favourites });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  favouriteNumberController,
  favouritedController,
  addToFavouriteController,
  removeFromFavouriteController,
  getFavouritedMovieController,
};
