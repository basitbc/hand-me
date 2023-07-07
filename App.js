import * as React from "react";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Routes from "./Routes";
import authActions from "./src/redux/auth/actions";
import productActions from "./src/redux/products/actions";

// To see all the requests in the Chrome DevTools network tab.
if (typeof window !== "undefined") {
  XMLHttpRequest = window.originalXMLHttpRequest
    ? window.originalXMLHttpRequest
    : window.XMLHttpRequest;

  // Fetch logger
  window._fetch = window.fetch;
  window.fetch = function (uri, options, ...args) {
    return window._fetch(uri, options, ...args).then((response) => {
      return response;
    });
  };
}

export default function App() {
  const auth = store.getState().auth;
  console.log(auth, "auth");

  React.useEffect(() => {
    // store.dispatch(productActions.getAllProducts());
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
