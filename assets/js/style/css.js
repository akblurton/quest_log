import { createGlobalStyle } from "styled-components";
import * as theme from "./theme";

const Style = createGlobalStyle`
  body {
    background: ${theme.background};
    color: ${theme.foreground};
    font-family: 'Fira Sans', sans-serif;
  }
`;
export default Style;
