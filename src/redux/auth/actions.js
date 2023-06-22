import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import auth from "../../api/auth";
const authActions = {
  LOGOUT: "LOGOUT",
  SHOWERROR: "SHOWERROR",
  CLEARERROR: "CLEARERROR",
  CHECK_EMAIL: "CHECK_EMAIL",
  SEND_OTP: "SEND_OTP",
  AUTHENTICATE: "AUTHENTICATE",
  SET_CREDENTIALS: "SET_CREDENTIALS",
  setCredentials: (credentials) => {
    return {
      type: authActions.SET_CREDENTIALS,
      payload: credentials,
    };
  },
  logout: () => {
    return {
      type: authActions.LOGOUT,
      isLogin: false,
      accessToken: null,
      loginSuccess: null,
    };
  },
  showError: (error) => {
    return {
      type: authActions.SHOWERROR,
      payload: error,
    };
  },

  clearError: () => {
    return {
      type: authActions.CLEARERROR,
    };
  },

  checkEmail: (email) => {
    return (dispatch) => {
      auth
        .checkEmail({ email: email })
        .then((response) => {
          if (response.status === 200) {
            console.log(response, "response"); // Console log the response
            dispatch({
              type: authActions.CHECK_EMAIL,
              payload: response.data.isValid,
            });
          } else {
            console.log("Error in checking email");
          }
        })
        .catch((error) => {
          console.error("Error checking email", error);
        });
    };
  },
  sendOtp: (email) => {
    return (dispatch) => {
      auth.sendOtp({ email: email }).then((response) => {
        console.log(response, "res");
        if (response.status === 200) {
          dispatch({
            type: authActions.SEND_OTP,
            payload: response.data,
          });
          setTimeout(() => {
            dispatch({
              type: authActions.SEND_OTP,
              payload: "",
            });
          }, 5000);
        } else {
          console.log("Error in sending code");
        }
      });
    };
  },
  authenticate: (credentials) => {
    return (dispatch) => {
      auth.authenticate(credentials).then((response) => {
        const token = response?.data?.token;

        const decodedToken = jwtDecode(token);
        console.log(response);
        if (response.status === 200) {
          dispatch({
            type: authActions.AUTHENTICATE,
            payload: decodedToken,
            success: response?.data?.success,
          });
        } else {
          console.log("Error in sending code");
        }
      });
    };
  },
};

export default authActions;
