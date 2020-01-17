import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

// import TodoApp from "./TodoApp";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    {/* <TodoApp /> */}
    {<App />}
  </Provider>,
  rootElement
);