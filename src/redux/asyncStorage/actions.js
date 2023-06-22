import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import auth from "../../api/auth";
const asyncStorageActions = {
  GET_ASYNC_STORAGE: "GET_ASYNC_STORAGE",
  CLEAR_ASYNC_STORAGE: "CLEAR_ASYNC_STORAGE",

  getAsyncStorage: () => {
    return (dispatch) => {
      auth
        .getAllAsyncStorageData()
        .then((response) => {
          // const data = JSON.parse(response); // Console log the response
          console.log(response, "res");
          dispatch({
            type: asyncStorageActions.GET_ASYNC_STORAGE,
            payload: response,
          });
        })
        .catch((error) => {
          console.error("Error checking email", error);
        });
    };
  },
  clearAsyncStorage: () => {
    return async (dispatch) => {
      try {
        await AsyncStorage.clear();
        console.log("AsyncStorage cleared successfully.");
        dispatch({ type: asyncStorageActions.CLEAR_ASYNC_STORAGE });
      } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
      }
    };
  },
};

export default asyncStorageActions;
