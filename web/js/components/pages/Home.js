import React from "react";
import Title from "../Typography/Title";
import Preview from "features/journals/components/Preview";
import Grid from "components/Layout/Grid";
import GlobalAction from "components/UI/GlobalAction";

const Home = () => {
  return (
    <>
      <Title>I&apos;m home!</Title>
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
