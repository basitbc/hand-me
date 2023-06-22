import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorageActions from "./actions";

const initState = {
  asyncStorage: {},
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case asyncStorageActions.GET_ASYNC_STORAGE:
      return {
        ...state,
        asyncStorage: action.payload, // Reset isValid to false
      };
    case asyncStorageActions.CLEAR_ASYNC_STORAGE:
      AsyncStorage.clear();
      return {
        ...state,
        asyncStorage: {},
      };

    default:
      return state;
  }
}
