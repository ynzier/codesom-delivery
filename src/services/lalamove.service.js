import http from "../http-common";
const prefix = "/lalamove";
const getFare = async (data) => {
  return await http.post(prefix + "/getFare", data);
};
const doTransaction = async (data) => {
  return await http.post(prefix + "/doTransaction", data);
};
const getDeliveryStatus = async (orderId) => {
  return await http.get(prefix + "/getDeliveryStatus/" + orderId);
};
const getTransactionHistoryByTel = async (tel) => {
  return await http.get(prefix + "/getTransactionHistoryByTel/" + tel);
};
export default {
  getFare,
  doTransaction,
  getDeliveryStatus,
  getTransactionHistoryByTel,
};
