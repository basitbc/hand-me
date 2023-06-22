import cartActions from "./actions";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Item already exists in cart, increase quantity and update price
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            const updatedItem = {
              ...item,
              qty: item.qty + action.payload.qty,
              price: item.price + action.payload.price,
            };
            return updatedItem;
          }
          return item;
        });

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // Item does not exist in cart, add it

        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case cartActions.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case cartActions.UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              qty:
                item.qty === 1 && action.payload.quantity < 0
                  ? 1
                  : item.qty + action.payload.quantity,
              price:
                item.qty === 1 && action.payload.quantity < 0
                  ? item.price
                  : item.price + action.payload.price,
            };
          }
          return item;
        }),
      };
    case cartActions.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
