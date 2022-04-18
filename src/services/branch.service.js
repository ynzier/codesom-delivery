import http from "../http-common";
const prefix = "/branch";
const getBranchDelivery = async () => {
  return await http.get(prefix + "/getBranchDelivery");
};
export default { getBranchDelivery };
