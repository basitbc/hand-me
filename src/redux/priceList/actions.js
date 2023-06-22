import prices from "../../api/services/priceList";

const priceListActions = {
  GET_ALL_PRICES: "GET_ALL_PRICES",
  UPDATE_LOADING: "UPDATE_LOADING",
  UPDATE_MODE: "UPDATE_MODE",
  UPDATE_PRICE_ID: "UPDATE_PRICE_ID",
  UPDATE_PRICE_DATA: "UPDATE_PRICE_DATA",
  RESET_STATE: "RESET_STATE",
  ADD_PRODUCT_PRICE: "ADD_PRODUCT_PRICE",
  SET_SELECTION: "SET_SELECTION",

  AddProductPrice: (product) => ({
    type: priceListActions.ADD_PRODUCT_PRICE,
    payload: product,
  }),

  getAllPrices: (customerId) => {
    return (dispatch) => {
      dispatch({
        type: priceListActions.UPDATE_LOADING,
        payload: true,
      });
      prices.getAllPrices(customerId, (response) => {
        if (response.status === "success") {
          dispatch({
            type: priceListActions.GET_ALL_PRICES,
            payload: response.data,
          });
          dispatch({
            type: priceListActions.UPDATE_LOADING,
            payload: false,
          });
        } else {
          console.log("Error occurred in getting prices");
        }
      });
    };
  },
  deletePrice: (priceId) => {
    return (dispatch) => {
      prices.deletePrice(priceId, (response) => {
        if (response.status === "success") {
          dispatch(priceListActions.getAllPrices());
        } else {
          console.log("Error occurred in deleting the price");
        }
      });
    };
  },

  addPrice: (newPriceData) => {
    return (dispatch) => {
      prices.addPrice(newPriceData, (response) => {
        if (response.status === "success") {
          dispatch(priceListActions.getAllPrices(newPriceData.adminId));
        } else {
          console.log("Error occurred in creating the price");
        }
      });
    };
  },
  updatePrice: (priceId, updatedPriceData) => {
    return (dispatch) => {
      prices.updatePrice(priceId, updatedPriceData, (response) => {
        if (response.status === "success") {
          dispatch(priceListActions.getAllPrices());
        } else {
          console.log("Error occurred in updating the price");
        }
      });
    };
  },
  updateLoading: () => ({ type: priceListActions.UPDATE_LOADING }),
  updateMode: (updatedMode) => ({
    type: priceListActions.UPDATE_MODE,
    payload: updatedMode,
  }),
  updatePriceId: (updatedPriceId) => ({
    type: priceListActions.UPDATE_PRICE_ID,
    payload: updatedPriceId,
  }),
  updatePriceData: (updatedPriceData) => ({
    type: priceListActions.UPDATE_PRICE_DATA,
    payload: updatedPriceData,
  }),
  resetState: () => ({
    type: priceListActions.RESET_STATE,
  }),
  setSelection: (number) => ({
    type: priceListActions.SET_SELECTION,
    payload: number,
  }),
};

export default priceListActions;
