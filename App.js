import * as React from "react";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Routes from "./Routes";

// To see all the requests in the Chrome DevTools network tab.
if (typeof window !== "undefined") {
  XMLHttpRequest = window.originalXMLHttpRequest
    ? window.originalXMLHttpRequest
    : window.XMLHttpRequest;

  // Fetch logger
  window._fetch = window.fetch;
  window.fetch = function (uri, options, ...args) {
    return window._fetch(uri, options, ...args).then((response) => {
      console.log("Fetch", { request: { uri, options, ...args }, response });
      return response;
    });
  };
}

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
