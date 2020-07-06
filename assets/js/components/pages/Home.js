import React from "react";
import styled from "styled-components";
import Title from "../Typography/Title";
import Preview from "features/journals/components/Preview";
import Grid from "components/Layout/Grid";
import Zoomable from "components/Media/Zoomable";
import GlobalAction from "components/UI/GlobalAction";

import TEST_IMAGE from "static/examples/1.jpg";

const Zoom = styled(Zoomable)`
  width: 40%;
  margin: 10px auto;
`;

const Home = () => {
  return (
    <>
      <Title>I&apos;m home!</Title>
      <Zoom src={TEST_IMAGE} />
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
