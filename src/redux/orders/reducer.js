import orderActions from "./actions";

// Initial state for the order
const initialState = {
  orders: [],
  order: {},
  loading: false,
  activePanel: "All",
  filteredOrders: [],
  selectedOrders: [],
};

// Reducer for order actions
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderActions.CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case orderActions.GET_ALL_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }

    case orderActions.GET_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
      };
    case orderActions.UPDATE_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
      };
    case orderActions.CANCEL_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
      };
    case orderActions.GET_ORDER_OF_CUSTOMER:
      return {
        ...state,
        orders: action.payload,
      };
    case orderActions.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case orderActions.ACTIVE_PANEL:
      return {
        ...state,
        activePanel: action.payload,
      };
    case orderActions.SELECTED_ORDERS:
      return {
        ...state,
        selectedOrders: action.payload,
      };
    case orderActions.SHOW_FILTERED_ORDERS:
      const filteredOrders =
        state?.orders &&
        state?.orders?.data?.filter(
          (order) => order.status === state?.activePanel
        );
      return {
        ...state,
        filteredOrders: filteredOrders,
      };
    case orderActions.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default orderReducer;
