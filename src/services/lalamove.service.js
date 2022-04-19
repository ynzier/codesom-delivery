import http from "../http-common";
const prefix = "/lalamove";
const getFare = async (data) => {
  return await http.post(prefix + "/getFare", data);
};
export default { getFare };
