import styled from "styled-components";
import * as theme from "~/style/theme";

const Panel = styled.div`
  border-radius: 8px;
  background: ${theme.background};
  border: ${theme.backgroundAlt} 2px solid;
  padding: 16px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

export default Panel;
