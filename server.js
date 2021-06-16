const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRouter = require("./routes/user.route");
const commentRouter = require("./routes/comment.route");
const favouriteRouter = require("./routes/favourite.route");
const likeRouter = require("./routes/like.route");

// Config .env to ./config/config.env
dotenv.config({
  path: "./.env",
});

// Database Connection.=
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  })
  .catch((err) => console.log(err));

// Middlewares
app.enable("trust proxy");
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://moviedb6.netlify.app"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/favourite", favouriteRouter);
app.use("/api/like", likeRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
