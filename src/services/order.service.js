import http from "../http-common";
const prefix = "/order";
const getQRCodeDelivery = async (data) => {
  return await http.post(prefix + "/getQRCodeDelivery", data);
};
const checkDeliveryCharge = async (chrgId) => {
  return await http.post(prefix + "/checkDeliveryCharge", { chrgId: chrgId });
};
export default { getQRCodeDelivery, checkDeliveryCharge };
