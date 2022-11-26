import axios from "axios";

import { NODE_ENV } from "./configs";

const instance = axios.create({
  baseURL:
    NODE_ENV === "production"
      ? "https://crowded-pear-gaiters.cyclic.app"
      : "http://localhost:5000",
  withCredentials: true,
});

export default instance;
