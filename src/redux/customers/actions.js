import customers from "../../api/services/customers";

const customerActions = {
  GET_ALL_CUSTOMERS: "GET_ALL_CUSTOMERS",
  UPDATE_LOADING: "UPDATE_LOADING",
  UPDATE_MODE: "UPDATE_MODE",
  UPDATE_CUSTOMER_ID: "UPDATE_CUSTOMER_ID",
  UPDATE_CUSTOMER_DATA: "UPDATE_CUSTOMER_DATA",

  getAllCustomers: (adminId) => {
    return (dispatch) => {
      dispatch({
        type: customerActions.UPDATE_LOADING,
        payload: true,
      });
      customers.getAllCustomers(adminId, (response) => {
        if (response.status === "success") {
          dispatch({
            type: customerActions.GET_ALL_CUSTOMERS,
            payload: response.data,
          });
          dispatch({
            type: customerActions.UPDATE_LOADING,
            payload: false,
          });
        } else {
          console.log("Error occurred in getting customers");
        }
      });
    };
  },
  deleteCustomer: (customerId, adminId) => {
    return (dispatch) => {
      customers.deleteCustomer(customerId, (response) => {
        if (response.status === "success") {
          dispatch(customerActions.getAllCustomers(adminId));
        } else {
          console.log("Error occurred in deleting the customer");
        }
      });
    };
  },

  addCustomer: (newCustomerData) => {
    return (dispatch) => {
      customers.addCustomer(newCustomerData, (response) => {
        if (response.status === "success") {
          dispatch(customerActions.getAllCustomers(newCustomerData?.adminId));
        } else {
          console.log("Error occurred in creating the customer");
        }
      });
    };
  },

  updateCustomerData: (updatedCustomerData) => ({
    type: customerActions.UPDATE_CUSTOMER_DATA,
    payload: updatedCustomerData,
  }),
  updateLoading: () => ({ type: customerActions.UPDATE_LOADING }),
  updateMode: (updatedMode) => ({
    type: customerActions.UPDATE_MODE,
    payload: updatedMode,
  }),
  updateCustomerId: (updatedCustomerId) => ({
    type: customerActions.UPDATE_CUSTOMER_ID,
    payload: updatedCustomerId,
  }),
};

export default customerActions;
