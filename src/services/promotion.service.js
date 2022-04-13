import http from "../http-common";
const prefix = "/promotion";
const getCurrentPromotion = async () => {
  return await http.get(prefix + "/getCurrentPromotion");
};

const getPromotionById = async (promoId) => {
  return await http.get(prefix + "/getPromotionById", {
    params: { promoId: promoId },
  });
};
export default { getCurrentPromotion, getPromotionById };
