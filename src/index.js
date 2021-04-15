import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./components/Game/Game";
import { Provider } from "react-redux";
import configureStore from "./store";

import reportWebVitals from "./reportWebVitals";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
