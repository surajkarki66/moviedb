const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const secret = process.env.JWT_SECRET;
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, secret, (err, decode) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Token" });
      }
      req.user = decode;
      req.token = token;
      next();
      return;
    });
  } else {
    return res.status(401).json({ msg: "Token is not supplied." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    return next();
  }
  return res.status(401).json({ msg: "Admin Token is not valid." });
};

module.exports = { isAuth, isAdmin };
