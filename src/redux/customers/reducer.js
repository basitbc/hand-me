import customerActions from "./actions";

const initialState = {
  customers: [],
  loading: false,
  mode: null,
  customerId: null,
  customerData: {
    _id: "",
    name: "",
    companyName: "",
    email: ""
  }
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case customerActions.GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case customerActions.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case customerActions.UPDATE_MODE:
      return {
        ...state,
        mode: action.payload
      };
    case customerActions.UPDATE_CUSTOMER_ID:
      return {
        ...state,
        customerId: action?.payload
      };
    case customerActions.UPDATE_CUSTOMER_DATA:
      return {
        ...state,
        customerData: action.payload
      };
    default:
      return state;
  }
};

export default customerReducer;
