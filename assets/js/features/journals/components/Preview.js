import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Panel from "components/layout/Panel";
import Skeleton from "react-loading-skeleton";
import RandomIllustration from "components/Illustration/Random";
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
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }
`;

const Preview = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const rand = Math.floor(2500 + Math.random() * 5000);
    console.log("Loading in", rand, "ms");
    const id = setTimeout(setLoaded, rand, true);
    return () => clearTimeout(id);
  }, []);
  return (
    <StyledPanel>
      <Picture>
        <RandomIllustration
          choices={[
            "arcade",
            "game_night",
            "game_world",
            "gaming",
            "player_select",
          ]}
        />
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
