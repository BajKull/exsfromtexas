import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "./redux/reducers/index";
import reportWebVitals from "./reportWebVitals";

const store = createStore(allReducer);

// const store = createStore(
//   allReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
