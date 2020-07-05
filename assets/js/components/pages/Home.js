import React from "react";
import Title from "../Typography/Title";
import Illustration from "components/Illustration";
import Preview from "features/journals/components/Preview";
import Grid from "components/layout/Grid";
import GlobalAction from "components/UI/GlobalAction";

const Home = () => {
  return (
    <>
      <Title>I&apos;m home!</Title>
      <Grid>
        <Preview>
          <Illustration name="add" width="200px" />
        </Preview>
        <Preview>
          <Illustration name="empty" width="200px" />
        </Preview>
      </Grid>
      <GlobalAction icon="add" />
    </>
  );
};

export default Home;
