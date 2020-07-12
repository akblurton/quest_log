import styled from "styled-components";
import { Link } from "react-router-dom";
import * as theme from "~/style/theme";

export default styled(Link)`
  color: ${theme.primary};
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;
