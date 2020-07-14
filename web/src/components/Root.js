import React from "react";
import PropTypes from "prop-types";
import { StyleSheetManager } from "styled-components";
import { Provider } from "react-redux";
import store from "../store";

import Style from "../style/css";
import { ThemeProvider } from "../style/ThemeProvider";
import SkeletonTheme from "../style/Skeleton";
import Logo from "./Branding/Logo";
import DarkModeToggle from "./UI/DarkModeToggle";
import Router from "./Router";

import useLocalStorage from "~/hooks/localStorage";

const Root = ({ Router: R }) => {
  const [dark, setDark] = useLocalStorage(
    "dark_mode",
    () =>
      global.matchMedia &&
      !!global.matchMedia("(prefers-color-scheme: dark)").matches
  );

  return (
    <StyleSheetManager disableVendorPrefixes>
      <ThemeProvider>
        <SkeletonTheme>
          <Provider store={store}>
            <DarkModeToggle dark={dark} onChange={setDark} />
            <Style />
            <Logo>Video Game Journal</Logo>
            <Router Router={R} />
          </Provider>
        </SkeletonTheme>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

Root.propTypes = {
  Router: PropTypes.func,
};

export default Root;