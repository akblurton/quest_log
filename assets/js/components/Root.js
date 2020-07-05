import React from "react";
import { hot } from "react-hot-loader/root";

import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "../store";

import Style from "../style/css";
import SkeletonTheme from "../style/Skeleton";
import Logo from "./Branding/Logo";
import DarkModeToggle from "./UI/DarkModeToggle";
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
          <DarkModeToggle dark={dark} onChange={setDark} />
          <Style />
          <Logo>Video Game Journal</Logo>
          <Router />
        </Provider>
      </SkeletonTheme>
    </ThemeProvider>
  );
};

export default hot(Root);
