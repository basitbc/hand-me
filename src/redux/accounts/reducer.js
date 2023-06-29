import accountActions from "./actions";

const initialState = {
  customerAccount: [],
  accounts: [],
  loading: false,
  mode: "view",
  accountId: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case accountActions.GET_ALL_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case accountActions.GET_CUSTOMER_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case accountActions.UPDATE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case accountActions.UPDATE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case accountActions.UPDATE_ACCOUNT_ID:
      return {
        ...state,
        accountId: action.payload,
      };
    case accountActions.UPDATE_ACCOUNT_DATA:
      const updatedAccounts = state.accounts.map((account) =>
        account._id === action.payload._id ? action.payload : account
      );
      return {
        ...state,
        accounts: updatedAccounts,
      };
    default:
      return state;
  }
};

export default accountReducer;
