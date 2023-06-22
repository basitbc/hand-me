import AsyncStorage from "@react-native-async-storage/async-storage";

const cartActions = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART_ITEM_QUANTITY: "UPDATE_CART_ITEM_QUANTITY",
  CLEAR_CART: "CLEAR_CART",

  addToCart: (item) => {
    return {
      type: cartActions.ADD_TO_CART,
      payload: item,
    };
  },
  removeFromCart: (itemId) => {
    return {
      type: cartActions.REMOVE_FROM_CART,
      payload: itemId,
    };
  },
  updateCartItemQuantity: (itemId, quantity, price) => {
    return {
      type: cartActions.UPDATE_CART_ITEM_QUANTITY,
      payload: { itemId, quantity, price },
    };
  },
  clearCart: () => {
    return {
      type: cartActions.CLEAR_CART,
    };
  },
};

export default cartActions;
