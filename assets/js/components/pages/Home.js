import React from "react";
import Title from "../Typography/Title";
import Illustration from "components/Illustration";

const Home = () => {
  return (
    <>
      <Title>I&apos;m home!</Title>
      <Illustration name="add" width="200px" />
      <Illustration name="non" width="200px" />
      <Illustration name="empty" width="200px" />
    </>
  );
};

export default Home;
