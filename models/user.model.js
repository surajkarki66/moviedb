const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    maxlength: 50,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    default: "subscriber",
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  isAuth: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      role: user.role,
      image: user.image,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
