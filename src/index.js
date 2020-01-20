import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store} >
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  rootElement
);