import * as React from "react";
import Routes from "./Routes"; // Importing the Routes component

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


  return (
    <div>
      <Routes /> 
      </div>
  );
}
