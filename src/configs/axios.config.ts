import axios from "axios";

const instance = axios.create({
  baseURL: "http://15.235.185.205:8000/",
});

export default instance;
