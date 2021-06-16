const { Like } = require("../models/like.model");

const getLikesController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.movieId) {
      variable = { movieId: req.body.movieId };
    } else {
      variable = { commentId: req.body.commentId };
    }
    const likes = await Like.find(variable);
    if (likes) {
      res.status(200).json({ success: true, likes });
    }
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};

const upLikeController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.movieId) {
      variable = { movieId: req.body.movieId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    const like = new Like(variable);
    const success = await like.save();
    if (success) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const unLikeController = async (req, res) => {
  try {
    let variable = {};
    if (req.body.movieId) {
      variable = { movieId: req.body.movieId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    const result = await Like.findOneAndDelete(variable);
    if (result) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  getLikesController,
  upLikeController,
  unLikeController,
};
