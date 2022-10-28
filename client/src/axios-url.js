import axios from "axios";

import { NODE_ENV } from "./configs";

const instance = axios.create({
  baseURL:
    NODE_ENV === "production"
      ? "https://web-production-374d.up.railway.app"
      : "http://localhost:5000",
  withCredentials: true,
});

export default instance;
