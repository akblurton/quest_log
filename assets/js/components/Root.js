import React from "react";
import { hot } from "react-hot-loader/root";
import Style from "../style";
import Title from "./Typography/Title";

const Root = () => (
  <>
    <Style />
    <Title>Video Game Journal</Title>
  </>
);

export default hot(Root);
