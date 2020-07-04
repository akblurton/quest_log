import React from "react";
import { hot } from "react-hot-loader/root";

import Style from "../style";
import Title from "./Typography/Title";
import Router from "./Router";

const Root = () => (
  <>
    <Style />
    <Title>Video Game Journal</Title>
    <Router />
  </>
);

export default hot(Root);
