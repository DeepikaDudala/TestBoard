import axios from "axios";
axios.defaults.withCredentials = "include";
const instance = axios.create({
  baseURL: process.env.FRONTEND_URL + "/api/v1",
  withCredentials: "include",
});

export default instance;
