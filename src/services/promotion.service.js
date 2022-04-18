import http from "../http-common";
const prefix = "/promotion";
const getPromoForDelivery = async () => {
  return await http.get(prefix + "/getPromoForDelivery");
};

const getPromotionById = async (promoId) => {
  return await http.get(prefix + "/getPromotionById", {
    params: { promoId: promoId },
  });
};
export default { getPromoForDelivery, getPromotionById };
