const initialState = {
  formValues: null,
  errorMessage: ""
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "REGISTER":
      const { payload } = action;
      return {
        ...state,
        formValues: payload
      };
    default:
      return state;
  }
}
