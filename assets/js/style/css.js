import { createGlobalStyle } from "styled-components";
import * as theme from "./theme";

const Style = createGlobalStyle`
  body {
    background: ${theme.background};
    color: ${theme.foreground};
    font-family: 'Roboto Slab', serif;
    font-weight: 300;
    line-height: 1.4;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }
`;
export default Style;
