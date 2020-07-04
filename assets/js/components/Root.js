import React, { useState } from "react";
import { hot } from "react-hot-loader/root";

import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "../store";

import Style from "../style/css";
import Title from "./Typography/Title";
import Router from "./Router";

const Root = () => {
  const [dark, setDark] = useState(
    () => !!window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  return (
    <ThemeProvider theme={{ mode: dark ? "dark" : "light" }}>
      <Provider store={store}>
        <button onClick={() => setDark((d) => !d)}>Change Theme</button>
        <Style />
        <Title>Video Game Journal</Title>
        <Router />
      </Provider>
    </ThemeProvider>
  );
};

export default hot(Root);