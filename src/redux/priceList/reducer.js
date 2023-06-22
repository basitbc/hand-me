import AsyncStorage from "@react-native-async-storage/async-storage";
import priceListActions from "./actions";

const localStorageData = AsyncStorage.getItem("persist:root");
if (localStorageData) {
  const authData = localStorageData.auth;
  var adminId = authData && authData?.admin?.id;
}

const initialState = {
  productPrice: {
    adminId: adminId,
    customerId: "",
    products: [],
  },
  prices: [],
  loading: false,
  mode: "",
  priceId: "",
  priceData: {},
  selectedButton: 1,
};

const priceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PRICES":
      return {
        ...state,
        prices: action.payload,
      };

    case priceListActions.ADD_PRODUCT_PRICE:
      console.log(action.payload);
      return {
        ...state,
        productPrice: action.payload,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "UPDATE_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    case "UPDATE_PRICE_ID":
      return {
        ...state,
        priceId: action.payload,
      };
    case "UPDATE_PRICE_DATA":
      return {
        ...state,
        priceData: action.payload,
      };
    case "RESET_STATE":
      return {
        ...state,
        priceData: initialState.productPrice,
      };
    case priceListActions.SET_SELECTION:
      return {
        ...state,
        selectedButton: action.payload,
      };
    default:
      return state;
  }
};

export default priceListReducer;
