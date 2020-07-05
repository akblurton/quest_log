import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import controllerAnimation from "static/loaders/controllers.svg";
import * as theme from "style/theme";
import useAnimationFrame from "hooks/animationFrame";

const MAX = 283,
  OFF_DURATION = 240;
const LoadingBG = styled.div`
  background: url("${controllerAnimation}") ${theme.secondary} center / 100% repeat;
  display: block;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) inset;
  border-radius: 50%;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Root = styled.div.withConfig({
  shouldForwardProp: () => false,
})`
  display: block;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 7vmin;
  height: 7vmin;
  min-width: 100px;
  min-height: 100px;
  transform: ${({ on }) => (on ? "scale(1)" : "scale(0)")};
  transition: transform ease-in-out;
  transition-duration: ${({ on }) => (on ? "0.5s" : "0.3s")};
  transition-delay: ${({ on }) => (on ? "0" : OFF_DURATION)}ms;
`;

const Circle = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  stroke: ${theme.primary};
  stroke-linecap: butt;
  stroke-dasharray: ${MAX};
  stroke-width: 10px;
  transform-origin: 50% 50%;
  fill: none;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const NetworkLoader = ({ on, ...props }) => {
  const [progress, setProgress] = useState(MAX);
  const elapsed = useRef(0),
    location = useRef(null);
  useEffect(() => {
    if (on) {
      setProgress(MAX);
    } else {
      elapsed.current = 0;
    }
  }, [on]);
  useAnimationFrame((dt) => {
    if (on) {
      const seconds = 1 / dt;
      let change = Math.floor(progress / 5);
      setProgress(
        (p) => (location.current = Math.max(2, p - change * seconds))
      );
    } else {
      elapsed.current = Math.min(OFF_DURATION, elapsed.current + dt);
      const change = (location.current * elapsed.current) / OFF_DURATION;
      setProgress(Math.round(location.current - change));
    }
  });
  return (
    <Root on={on} {...props}>
      <Circle>
        <circle cx="50" cy="50" r="45" strokeDashoffset={progress} />
      </Circle>
      <LoadingBG />
    </Root>
  );
};

NetworkLoader.propTypes = {
  on: PropTypes.bool,
};

NetworkLoader.defaultProps = {
  on: false,
};

export default NetworkLoader;
