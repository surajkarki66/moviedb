const { User } = require("../models/user.model");

const registerController = async (req, res) => {
  const { username, password, image } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return res.status(422).json({
      error: "Username is already taken.",
    });
  } else {
    const user = new User({
      username,
      password,
      image,
    });
    const success = user.save();
    if (success) {
      return res
        .status(200)
        .json({ success: true, message: "Account successfully created." });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Something wrong with database." });
    }
  }
};

const loginController = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          error: "User does not exist.",
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res
            .status(400)
            .json({ loginSuccess: false, error: "Wrong password" });
        }
        user.generateToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }

          res.status(200).json({
            loginSuccess: true,
            userId: user._id,
            token: user.token,
          });
        });
      });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ loginSuccess: false, error: "Something wrong with database." });
    });
};

const me = (req, res) => {
  return res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === "subscriber" ? false : true,
    isAuth: true,
    username: req.user.username,
    role: req.user.role,
    image: req.user.image,
  });
};

module.exports = { registerController, loginController, me };
