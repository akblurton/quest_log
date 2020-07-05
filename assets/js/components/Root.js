import React from "react";
import { hot } from "react-hot-loader/root";

import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "../store";

import Style from "../style/css";
import SkeletonTheme from "../style/skeleton";
import Logo from "./Branding/Logo";
import Router from "./Router";
import useLocalStorage from "hooks/localStorage";

const Root = () => {
  const [dark, setDark] = useLocalStorage(
    "dark_mode",
    () => !!window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  return (
    <ThemeProvider theme={{ mode: dark ? "dark" : "light" }}>
      <SkeletonTheme>
        <Provider store={store}>
          <button onClick={() => setDark((d) => !d)}>Change Theme</button>
          <Style />
          <Logo>Video Game Journal</Logo>
          <Router />
        </Provider>
      </SkeletonTheme>
    </ThemeProvider>
  );
};

export default hot(Root);
