import axios from "axios";

import { NODE_ENV } from "./configs";

const instance = axios.create({
  baseURL:
    NODE_ENV === "production"
      ? "https://moviedb66.herokuapp.com"
      : "http://localhost:5000",
  withCredentials: true,
});

export default instance;
