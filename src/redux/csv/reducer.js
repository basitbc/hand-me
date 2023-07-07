import csvActions from "./actions";

const initialState = {
  csvFile: {
    name: "",
    size: null,
  },
  openCsv: false,
};

const csvReducer = (state = initialState, action) => {
  switch (action.type) {
    case csvActions.UPLOAD_CSV_FILE:
      return {
        ...state,
        csvFile: {
          ...state.csvFile,
          name: action.payload.name,
          size: action.payload.size,
        },
      };
    case csvActions.HANDLE_CSV_MODAL:
      return {
        ...state,
        openCsv: action.payload,
      };
    default:
      return state;
  }
};

export default csvReducer;
