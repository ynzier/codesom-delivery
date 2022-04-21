import http from "../http-common";
const prefix = "/lalamove";
const getFare = async (data) => {
  return await http.post(prefix + "/getFare", data);
};
const doTransaction = async (data) => {
  return await http.post(prefix + "/doTransaction", data);
};
export default { getFare, doTransaction };
