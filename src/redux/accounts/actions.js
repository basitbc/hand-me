import accounts from "../../api/services/accounts";

const accountActions = {
  GET_ALL_ACCOUNTS: "GET_ALL_ACCOUNTS",
  UPDATE_LOADING: "UPDATE_LOADING",
  UPDATE_MODE: "UPDATE_MODE",
  UPDATE_ACCOUNT_ID: "UPDATE_ACCOUNT_ID",
  UPDATE_ACCOUNT_DATA: "UPDATE_ACCOUNT_DATA",

  getAllAccounts: (adminId) => {
    return (dispatch) => {
      dispatch({
        type: accountActions.UPDATE_LOADING,
        payload: true,
      });
      accounts.getAllAccounts(adminId, (response) => {
        if (response.status === "success") {
          dispatch({
            type: accountActions.GET_ALL_ACCOUNTS,
            payload: response.data,
          });
          dispatch({
            type: accountActions.UPDATE_LOADING,
            payload: false,
          });
        } else {
          console.log("Error occurred in getting accounts");
        }
      });
    };
  },
  deleteAccount: (accountId, adminId) => {
    return (dispatch) => {
      accounts.deleteAccount(accountId, (response) => {
        if (response.status === "success") {
          dispatch(accountActions.getAllAccounts(adminId));
        } else {
          console.log("Error occurred in deleting the account");
        }
      });
    };
  },

  updateAccount: (accountId, updatedData) => {
    return (dispatch) => {
      accounts.updateAccount(accountId, updatedData, (response) => {
        if (response.status === "success") {
          dispatch(accountActions.getAllAccounts(updatedData?.adminId)); // Update the accounts after update
        } else {
          console.log("Error occurred in updating the account");
        }
      });
    };
  },

  addAccount: (newAccountData) => {
    return (dispatch) => {
      accounts.addAccount(newAccountData, (response) => {
        if (response.status === "success") {
          dispatch(accountActions.getAllAccounts(newAccountData?.adminId));
        } else {
          console.log("Error occurred in creating the account");
        }
      });
    };
  },

  updateAccountData: (updatedAccountData) => ({
    type: accountActions.UPDATE_ACCOUNT_DATA,
    payload: updatedAccountData,
  }),
  updateLoading: () => ({ type: accountActions.UPDATE_LOADING }),
  updateMode: (updatedMode) => ({
    type: accountActions.UPDATE_MODE,
    payload: updatedMode,
  }),
  updateAccountId: (updatedAccountId) => ({
    type: accountActions.UPDATE_ACCOUNT_ID,
    payload: updatedAccountId,
  }),
};

export default accountActions;
