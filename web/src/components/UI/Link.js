import styled from "styled-components";
import { Link } from "react-router-dom";
import * as theme from "~/style/theme";

export default styled(Link)`
  color: ${theme.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
