import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Sun, Moon } from "react-feather";
import * as theme from "style/theme";

const Button = styled.button`
  width: 44px;
  height: 44px;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;

  svg {
    /* fill: ${theme.foreground}; */
    stroke: ${theme.foreground};
    width: 24px;
    height: 24px;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  right: 100%;
  top: 50%;
  background: ${theme.background};
  color: ${theme.foreground};
  white-space: nowrap;
  font-size: 13px;
  font-weight: bold;
  line-height: 24px;
  margin-top: -12px;
  height: 24px;
  pointer-events: none;
  opacity: 0;
  transform: translateX(20px);
  transition: 0.3s transform ease-in-out, 0.3s opacity ease-in-out;

  ${Button}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const DarkModeToggle = ({ dark, onChange }) => {
  const onToggle = useCallback(() => onChange((d) => !d), [onChange]);
  return (
    <Button darkMode={dark} onClick={onToggle}>
      {dark ? <Moon /> : <Sun />}
      <Tooltip>Switch Color Scheme</Tooltip>
    </Button>
  );
};
DarkModeToggle.propTypes = {
  dark: PropTypes.bool,
  onChange: PropTypes.func,
};

export default DarkModeToggle;
