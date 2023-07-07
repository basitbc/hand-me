import orders from "../../api/services/orders";
import cartActions from "../cart/actions";

const orderActions = {
  CREATE_ORDER: "CREATE_ORDER",
  GET_ALL_ORDERS: "GET_ALL_ORDERS",
  GET_ORDER_BY_ID: "GET_ORDER_BY_ID",
  UPDATE_ORDER_BY_ID: "UPDATE_ORDER_BY_ID",
  CANCEL_ORDER_BY_ID: "CANCEL_ORDER_BY_ID",
  GET_ORDER_OF_CUSTOMER: "GET_ORDER_OF_CUSTOMER",
  UPDATE_LOADING: "UPDATE_LOADING",
  RESET_STATE: "RESET_STATE",
  ACTIVE_PANEL: "ACTIVE_PANEL",
  SHOW_FILTERED_ORDERS: "SHOW_FILTERED_ORDERS",
  SELECTED_ORDERS: "SELECTED_ORDERS",
  SHOW_MESSAGE: "SHOW_MESSAGE",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",

  createOrder: (orderData) => {
    return (dispatch) => {
      // dispatch(orderActions.getAllOrders(orderData.customerId));

      dispatch({
        type: orderActions.UPDATE_LOADING,
        payload: true,
      });
      orders.createOrder(orderData, (response) => {
        if (response?.data?.result?.success === true) {
          dispatch({
            type: cartActions.CLEAR_CART,
          });
          dispatch({
            type: orderActions.SHOW_MESSAGE,
            payload: response.data.result,
          });
          setTimeout(() => {
            dispatch({
              type: orderActions.CLEAR_MESSAGE,
            });
          }, 3000);
          dispatch({
            type: orderActions.CREATE_ORDER,
            payload: response.data.data,
          });
          dispatch({
            type: orderActions.UPDATE_LOADING,
            payload: false,
          });
        } else {
          console.log("Error occurred in creating the order1");

          dispatch({
            type: orderActions.SHOW_MESSAGE,
            payload: response.data.result,
          });
          setTimeout(() => {
            dispatch({
              type: orderActions.CLEAR_MESSAGE,
            });
          }, 3000);
        }
      });
    };
  },

  getAllOrders: (customerId) => {
    return (dispatch) => {
      dispatch({
        type: orderActions.UPDATE_LOADING,
        payload: true,
      });
      orders.getAllOrders(customerId, (response) => {
        if (response.status === "success") {
          console.log(response.data, "data");

          dispatch({
            type: orderActions.GET_ALL_ORDERS,
            payload: response.data,
          });
          dispatch({
            type: orderActions.UPDATE_LOADING,
            payload: false,
          });
        } else {
          console.log("Error occurred in getting orders");
        }
      });
    };
  },

  getOrderById: (orderId) => {
    return (dispatch) => {
      dispatch({
        type: orderActions.UPDATE_LOADING,
        payload: true,
      });
      orders.getOrderById(orderId, (response) => {
        if (response.status === 200) {
          dispatch({
            type: orderActions.GET_ORDER_BY_ID,
            payload: response.data,
          });
          dispatch({
            type: orderActions.UPDATE_LOADING,
            payload: false,
          });
        } else {
          console.log("Error occurred in getting the order");
        }
      });
    };
  },

  updateOrderById: (orderId, updatedOrderData) => {
    return (dispatch) => {
      orders.updateOrderById(orderId, updatedOrderData, (response) => {
        if (response.status === "success") {
          dispatch({
            type: orderActions.UPDATE_ORDER_BY_ID,
            payload: response.data,
          });
          dispatch(orderActions.getAllOrders());
        } else {
          console.log("Error occurred in updating the order");
        }
      });
    };
  },

  cancelOrderById: (orderId) => {
    return (dispatch) => {
      orders.cancelOrderById(orderId, (response) => {
        if (response.status === 200) {
          dispatch({
            type: orderActions.CANCEL_ORDER_BY_ID,
            payload: response.data,
          });
        } else {
          console.log("Error occurred in canceling the order");
        }
      });
    };
  },

  getOrderOfCustomer: (userId) => {
    return (dispatch) => {
      orders.getOrderOfCustomer(userId, (response) => {
        if (response.status === 200) {
          dispatch({
            type: orderActions.GET_ORDER_OF_CUSTOMER,
            payload: response.data,
          });
        } else {
          console.log("Error occurred in getting the customer's orders");
        }
      });
    };
  },
  activePanel: (panel) => {
    return {
      type: orderActions.ACTIVE_PANEL,
      payload: panel,
    };
  },

  updateLoading: () => ({ type: orderActions.UPDATE_LOADING }),

  resetState: () => ({
    type: orderActions.RESET_STATE,
  }),
  clearMessage: () => ({
    type: orderActions.CLEAR_MESSAGE,
  }),

  showFilteredOrders: (orders) => ({
    type: orderActions.SHOW_FILTERED_ORDERS,
    payload: orders,
  }),
  selectedOrders: (orders) => {
    return {
      type: orderActions.SELECTED_ORDERS,
      payload: orders,
    };
  },
  showMessage: (message) => {
    return {
      type: orderActions.SHOW_MESSAGE,
      payload: message,
    };
  },
};

export default orderActions;
