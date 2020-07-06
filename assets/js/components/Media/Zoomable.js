import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import useNativeSize from "hooks/nativeSize";
import useCurrentSize from "hooks/currentSize";

const Wrapper = styled.div`
  position: relative;
  background: #000;
  border-radius: 4px;
  overflow: ${({ zoom }) => (zoom ? "visible" : "hidden")};
`;

const Media = styled(animated.img)`
  display: block;
  width: 100%;
  transform: scale(1, 1);
  ${({ activated }) =>
    activated
      ? `
    position: fixed;
    z-index: 1000;
  `
      : ""};
`;

const root = document.createElement("div");
document.body.appendChild(root);

const Zoomable = ({ className, src }) => {
  const [zoom, setZoom] = useState(false);
  const [media, { width: w, height: h }] = useNativeSize(src);
  const [ref, { width, height, left, top }] = useCurrentSize(zoom);
  console.log(w);
  const animation = useSpring({
    from: {
      width,
      height,
    },
    to: {
      width: w || width,
      height: h || height,
    },
    reset: zoom,
  });

  return (
    <>
      <Wrapper
        className={className}
        zoom={zoom}
        onClick={() => setZoom((z) => !z)}
        ref={ref}
        style={zoom ? { width, height } : {}}
      >
        {zoom ? (
          ReactDOM.createPortal(
            <Media
              activated={true}
              key="media"
              src={src}
              ref={media}
              style={{
                top,
                left,
                width: animation.width,
                height: animation.height,
              }}
            />,
            root
          )
        ) : (
          <Media key="media" src={src} ref={media} />
        )}
      </Wrapper>
    </>
  );
};

Zoomable.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
};

export default Zoomable;
