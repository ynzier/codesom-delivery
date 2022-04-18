import http from "../http-common";
const prefix = "/product";
const getAllDeliveryProduct = async () => {
  return await http.get(prefix + "/getAllDeliveryProduct");
};
export default { getAllDeliveryProduct };
