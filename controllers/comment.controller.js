const { Comment } = require("../models/comment.model");

const saveCommentController = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, writer: req.user._id });
    const cmt = await comment.save();
    if (cmt) {
      const result = await Comment.find({ _id: cmt._id }).populate("writer");
      if (result) {
        return res.status(200).json({ success: true, result });
      } else {
        return res
          .status(500)
          .json({ success: false, error: "Something went wrong" });
      }
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const getCommentController = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.body.movieId }).populate(
      "writer"
    );
    if (comments) {
      return res.status(200).json({ success: true, comments });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
module.exports = { saveCommentController, getCommentController };
