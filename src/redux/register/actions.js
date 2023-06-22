import auth from "../../api/auth";

const registerActions = {
  REGISTER: "REGISTER",

  register: data => {
    return dispatch => {
      dispatch({ type: registerActions.REGISTER, payload: data });
      if (data) {
        auth.registerUser(data).catch(error => {
          console.log(error);
        });
      }
    };
  }
};

export default registerActions;
