import AsyncStorage from "@react-native-async-storage/async-storage";
import authAction from "./actions";

const initState = {
  isLogin: AsyncStorage.getItem("isLogin")
    ? AsyncStorage.getItem("isLogin") === "true"
    : false,
  errorMessage: "",
  otpStatus: "",
  customer: {},
  credentials: {
    email: "",
    otpValue: "",
  },
  loginSuccess: "",
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case authAction.LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: action.accessToken,
        admin: action.admin,
      };
    case authAction.SHOWERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case authAction.LOGOUT:
      AsyncStorage.clear();
      return {
        ...initState,
      };
    case authAction.CLEARERROR:
      return {
        ...state,
        errorMessage: "",
      };
    case authAction.GET_ADMIN_ID:
      return {
        ...state,
        adminId: action.payload,
      };
    case authAction.SEND_CODE:
      return {
        ...state,
        isCodeSent: true,
      };
    case authAction.CHECK_EMAIL:
      return {
        ...state,
        isEmailValid: action.payload,
      };
    case authAction.RESET_IS_VALID:
      return {
        ...state,
        isEmailValid: "", // Reset isValid to false
      };
    case authAction.SEND_OTP:
      return {
        ...state,
        otpStatus: action.payload,
      };
    case authAction.AUTHENTICATE:
      return {
        ...state,
        customer: action.payload,
        isLogin: true,
        loginSuccess: action.success,
      };
    case authAction.SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };
    default:
      return state;
  }
}
