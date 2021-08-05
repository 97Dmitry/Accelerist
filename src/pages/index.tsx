import { NextComponentType } from "next";
import Head from "next/head";
import styled from "styled-components";
import MainLayout from "layouts/MainLayout";

interface IHome {}

const Home: NextComponentType<IHome> = ({}) => {
  return (
    <>
      <Wrapper>
        <h1>NextJS</h1>
      </Wrapper>
    </>
  );
};

export default Home;
//@ts-ignore
Home.getLayout = function getLayout(page) {
  return (
    <MainLayout title={"NextJS"} headTitle={"NextJS"}>
      {page}
    </MainLayout>
  );
};

const Wrapper = styled.div``;
