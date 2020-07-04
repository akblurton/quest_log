import React from "react";
import { hot } from "react-hot-loader/root";

import { Provider } from "react-redux";
import store from "../store";

import Style from "../style";
import Title from "./Typography/Title";
import Router from "./Router";

const Root = () => (
  <Provider store={store}>
    <Style />
    <Title>Video Game Journal</Title>
    <Router />
  </Provider>
);

export default hot(Root);
