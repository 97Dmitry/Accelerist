import { NextComponentType } from "next";
import Head from "next/head";
import styled from "styled-components";
import MainLayout from "layouts/MainLayout";

interface IHome {}

const Home: NextComponentType<IHome> = ({}) => {
  return (
    <div>
      <Head>
        <title>NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <h1>NextJS</h1>
      </Wrapper>
    </div>
  );
};

export default Home;

//@ts-ignore
Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

const Wrapper = styled.div``;
