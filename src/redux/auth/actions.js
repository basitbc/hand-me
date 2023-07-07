import jwtDecode from "jwt-decode";
import auth from "../../api/auth";
import customerActions from "../customers/actions";
const authActions = {
  LOGOUT: "LOGOUT",
  SHOWERROR: "SHOWERROR",
  CLEARERROR: "CLEARERROR",
  CHECK_EMAIL: "CHECK_EMAIL",
  SEND_OTP: "SEND_OTP",
  AUTHENTICATE: "AUTHENTICATE",
  AUTHENTICATEOTP: "AUTHENTICATEOTP",
  SET_CREDENTIALS: "SET_CREDENTIALS",
  RESET_IS_VALID: "RESET_IS_VALID",
  UPDATE_GUEST_USER: "UPDATE_GUEST_USER",
  RESET_FORGET_PASSWORD: "RESET_FORGET_PASSWORD",

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
            dispatch({
              type: authActions.CHECK_EMAIL,
              payload: response.data.isValid,
            });

            setTimeout(() => {
              dispatch({
                type: authActions.RESET_IS_VALID,
              });
            }, 3000); // Dispatch RESET_IS_VALID action after 3 seconds
          } else {
            console.log("Error in checking email");
            setTimeout(() => {
              dispatch({
                type: authActions.RESET_IS_VALID,
              });
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error checking email", error);
          setTimeout(() => {
            dispatch({
              type: authActions.RESET_IS_VALID,
            });
          }, 3000);
        });
    };
  },
  updateGuestUser: (customerId, updatedData) => {
    return (dispatch) => {
      auth.updateGuestUser(customerId, updatedData, (response) => {
        if (response.status === "success") {
          dispatch({
            type: authActions.UPDATE_GUEST_USER,
            payload: response.data,
          });
          dispatch(customerActions.getAllCustomers(updatedData?.adminId)); // Update the customers after update
        } else {
          console.log("Error occurred in updating the customer");
        }
      });
    };
  },
  sendOtp: (email) => {
    return (dispatch) => {
      auth.sendOtp({ email: email }).then((response) => {
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
          dispatch({
            type: authActions.SEND_OTP,
            payload: response,
          });
        }
      });
    };
  },
  authenticate: (credentials) => {
    return (dispatch) => {
      auth.authenticate(credentials).then((response) => {
        const token = response?.data?.token;

        const decodedToken = jwtDecode(token);
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
  authenticateOtp: (credentials) => {
    return (dispatch) => {
      auth.authenticateOtp(credentials).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: authActions.AUTHENTICATEOTP,
            payload: response.data,
          });
          setTimeout(() => {
            dispatch({
              type: authActions.RESET_FORGET_PASSWORD,
            });
          }, 3000);
        } else {
          console.log("Error in sending code");
        }
      });
    };
  },
};

export default authActions;
