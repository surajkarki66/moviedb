const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: String,
      required: [true, "movieId is required"],
    },
    movieTitle: {
      type: String,
      trim: true,
      required: [true, "movieTitle is required"],
    },
    moviePost: {
      type: String,
      required: [true, "moviePost is required"],
    },
    movieRunTime: {
      type: String,
      trim: true,
      required: [true, "movieRunTime is required"],
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
