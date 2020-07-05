import styled from "styled-components";
import darkLogo from "static/logos/game_journal_dark.png";
import lightLogo from "static/logos/game_journal_light.png";

const Logo = styled.h1`
  overflow: hidden;
  width: 300px;
  height: 100px;
  text-indent: -9999px;
  background: no-repeat center left / contain;
  /* stylelint-disable */
  background-image: url("${({ theme }) =>
    theme.mode === "dark" ? darkLogo : lightLogo}");
  /* stylelint-enable */
`;

export default Logo;
