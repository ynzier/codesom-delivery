/* 
cart = []
cartItem = { 
    productId: item.productId,
    promoId: item.promoId,
    name: item.name,
    price: item.price,
    total: item.price * amount,
    quantity: amount}
*/

const getItem = () => {
  const item = localStorage.getItem("cart");
  if (!item) localStorage.setItem("cart", "[]");
  return JSON.parse(item) || [];
};
const getItemById = (id) => {
  // id = { productId: number, promoId: number }
  let localCart = localStorage.getItem("cart");
  localCart = JSON.parse(localCart);
  //create a copy of our cart state, avoid overwritting existing state
  let cartCopy = [...localCart];

  //look for item in cart array
  if (id.promoId)
    return cartCopy.find((cartItem) => cartItem.promoId == id.promoId);
  else if (id.productId)
    return cartCopy.find((cartItem) => cartItem.productId == id.productId);
};
const addItem = (item, amount) => {
  // item = { id: number , quantity: number }
  let localCart = localStorage.getItem("cart");
  localCart = JSON.parse(localCart);
  //create a copy of our cart state, avoid overwritting existing state
  let cartCopy = [...localCart];

  const pushItem = {
    productId: item.productId,
    promoId: item.promoId,
    name: item.name,
    price: item.price,
    total: item.price * amount,
    quantity: amount,
    weight: item.weight,
    totalWeight: item.weight * amount,
  };
  cartCopy.push(pushItem);

  //make cart a string and store in local space
  let stringCart = JSON.stringify(cartCopy);
  localStorage.setItem("cart", stringCart);
};

const updateItem = (item, amount) => {
  // item = { id: number , quantity: number }

  let localCart = localStorage.getItem("cart");
  localCart = JSON.parse(localCart);
  let cartCopy = [...localCart];

  //find if item exists, just in case
  let existentItem = cartCopy.find((obj) => {
    if (item.promoId == null) return obj.productId == item.productId;
    if (item.productId == null) return obj.promoId == item.promoId;
  });

  //if it doesnt exist simply return
  if (!existentItem) return;
  //continue and update quantity
  existentItem.quantity = amount;
  existentItem.totalWeight = amount * existentItem.weight;
  existentItem.total = amount * existentItem.price;

  //validate result
  if (existentItem.quantity <= 0 && item.productId) {
    //remove item  by filtering it from cart array
    cartCopy = cartCopy.filter((obj) => obj.productId != item.productId);
  } else if (existentItem.quantity <= 0 && item.promoId) {
    //remove item  by filtering it from cart array
    cartCopy = cartCopy.filter((obj) => obj.promoId != item.promoId);
  }

  let cartString = JSON.stringify(cartCopy);
  localStorage.setItem("cart", cartString);
};
const removeItem = (item) => {
  // item = { id: number , quantity: number }
  let localCart = localStorage.getItem("cart");
  localCart = JSON.parse(localCart);
  //create a copy of our cart state, avoid overwritting existing state
  let cartCopy = [...localCart];

  //validate result
  if (item.productId) {
    //remove item  by filtering it from cart array
    cartCopy = cartCopy.filter((obj) => obj.productId != item.productId);
  } else if (item.promoId) {
    //remove item  by filtering it from cart array
    cartCopy = cartCopy.filter((obj) => obj.promoId != item.promoId);
  }
  let cartString = JSON.stringify(cartCopy);
  localStorage.setItem("cart", cartString);
};
const clearCart = () => {
  localStorage.removeItem("cart");
};
export default {
  getItem,
  getItemById,
  addItem,
  updateItem,
  removeItem,
  clearCart,
};
