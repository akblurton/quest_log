import React from "react";
import Title from "../Typography/Title";
import Preview from "features/journals/components/Preview";
import Grid from "components/Layout/Grid";
import GlobalAction from "components/UI/GlobalAction";

import styled, { keyframes } from "styled-components";

import healer_f from "static/sprites/cropped/healer_f.png";
import healer_m from "static/sprites/cropped/healer_m.png";
import mage_m from "static/sprites/cropped/mage_m.png";
import mage_f from "static/sprites/cropped/mage_f.png";
import ninja_f from "static/sprites/cropped/ninja_f.png";
import ninja_m from "static/sprites/cropped/ninja_m.png";
import ranger_f from "static/sprites/cropped/ranger_f.png";
import ranger_m from "static/sprites/cropped/ranger_m.png";
import townfolk1_m from "static/sprites/cropped/townfolk1_m.png";
import townfolk1_f from "static/sprites/cropped/townfolk1_f.png";
import warrior_m from "static/sprites/cropped/warrior_m.png";
import warrior_f from "static/sprites/cropped/warrior_f.png";

const animate = keyframes`
  0% {
    background-position: 0% 0%
  }

  100% {
    background-position: 100% 0%
  }

`;

const walk = keyframes`
  0% {
    transform: translateX(-50%)
  }
  100% {
    transform: translateX(50%)
  }
`;

const Walker = styled.div`
  animation: ${walk} 20s infinite linear;
`;

const Sprite = styled.div`
  /* stylelint-disable property-no-vendor-prefix, value-no-vendor-prefix */
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  /* stylelint-enable property-no-vendor-prefix */
  display: inline-block;
  min-height: ${({ size = 1 }) => 36 * size}px;
  min-width: ${({ size = 1 }) => 32 * size}px;
  margin: 12px 5px 50px;
  background: no-repeat url(${({ image }) => image});
  background-size: ${({ size }) => `${96 * size}px auto`};
  animation: ${animate} 0.6s infinite steps(2);
`;

const Home = () => {
  return (
    <>
      <Title>I&apos;m home!</Title>
      <Walker>
        <Sprite size={1} image={healer_f} />
        <Sprite size={1} image={healer_m} />
        <Sprite size={1} image={mage_m} />
        <Sprite size={1} image={mage_f} />
        <Sprite size={1} image={ninja_f} />
        <Sprite size={1} image={ninja_m} />
        <Sprite size={1} image={ranger_f} />
        <Sprite size={1} image={ranger_m} />
        <Sprite size={1} image={townfolk1_m} />
        <Sprite size={1} image={townfolk1_f} />
        <Sprite size={1} image={warrior_m} />
        <Sprite size={1} image={warrior_f} />
      </Walker>
      <Grid>
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
      </Grid>
      <GlobalAction icon="add" />
    </>
  );
};

export default Home;
