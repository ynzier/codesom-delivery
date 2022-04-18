import axios from "axios";
const instance = axios.create({
  // local http://localhost:4000
  // online https://api.knt-dev.online
  baseURL: "https://api.knt-dev.online/",
  timeout: 10000,
  timeoutErrorMessage: "การเชื่อมต่อขัดข้อง",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
