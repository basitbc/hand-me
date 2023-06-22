import productActions from "./actions";

const initialState = {
  products: [],
  loading: false,
  mode: null,
  productId: null,
  productData: {
    _id: "",
    name: "",
    defaultPrice: null,
    quantity: null,
    availableAt: "",
    code: "",
    details: "",
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productActions.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productActions.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case productActions.UPDATE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case productActions.UPDATE_PRODUCT_ID:
      return {
        ...state,
        productId: action.payload,
      };
    case productActions.UPDATE_PRODUCT_DATA:
      return {
        ...state,
        productData: action.payload,
      };
    case productActions.RESET_STATE:
      return {
        ...state,
        productData: initialState.productData, // Reset only the productData field
      };
    default:
      return state;
  }
};

export default productReducer;
