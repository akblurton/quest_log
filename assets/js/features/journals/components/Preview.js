import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Panel from "components/Layout/Panel";
import Skeleton from "react-loading-skeleton";
import BlockLink from "components/UI/BlockLink";

import * as theme from "style/theme";

const StyledPanel = styled(Panel)`
  /* height: 440px; */
  display: flex;
  flex-direction: column;

  & h2 {
    font-size: 32px;
  }

  & time {
    font-size: 13px;
    display: block;
    margin-bottom: 16px;
    color: ${theme.secondary};
  }

  & p {
    /* stylelint-disable */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    /* stylelint-enable */
    overflow: hidden;
    margin-bottom: 16px;
    height: 110px;
  }

  & a {
    margin-top: auto;
  }
`;

const Picture = styled.div`
  overflow: hidden;
  border-radius: 4px;
  width: 100%;
  height: 0;
  min-height: 0;
  box-sizing: content-box;
  padding-top: 70%;
  background: ${theme.skeleton};
  margin-bottom: 16px;
  position: relative;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* global require */
const examples = require.context("static/examples", false, /\.webm|jpg$/);
const opts = [];
for (const file of examples.keys()) {
  opts.push(examples(file).default);
}

let available = [...opts];
function getRandomImage() {
  if (!available.length) {
    available = [...opts];
  }
  const index = Math.floor(Math.random() * available.length);
  const [media] = available.splice(index, 1);
  return media;
}

const Preview = () => {
  const [loaded, setLoaded] = useState(false);
  const [img] = useState(getRandomImage);
  useEffect(() => {
    const rand = Math.floor(300 + Math.random() * 2300);
    const id = setTimeout(setLoaded, rand, true);
    return () => clearTimeout(id);
  }, []);
  const isVideo = /\.webm/.test(img);
  return (
    <StyledPanel>
      <Picture>
        {isVideo ? (
          <video
            src={img}
            loop={true}
            autoPlay={true}
            muted={true}
            controls={false}
          />
        ) : (
          <img src={img} />
        )}
      </Picture>
      <h2>{loaded ? "Title" : <Skeleton width="50%" />}</h2>
      <time>{loaded ? "10th August 2020" : <Skeleton width="30%" />}</time>
      <p>
        {loaded ? (
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ex consequatur excepturi animi earum vero. Laboriosam, eum ab! Incidunt ratione iure earum repellat nulla doloremque molestias soluta placeat quo, a iusto asperiores magni illum sapiente dolorum ut harum corporis? Facilis!"
        ) : (
          <Skeleton count={5} />
        )}
      </p>
      <BlockLink to="/">
        {loaded ? "Read More" : <Skeleton width={"15%"} />}
      </BlockLink>
    </StyledPanel>
  );
};

export default Preview;
