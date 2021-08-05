import React, { FC } from "react";
import Head from "next/head";
import styled from "styled-components";

import DarkLogo from "assets/svg/DarkLogo";
import { useAppSelector } from "store/hooks";
import { selectorUser } from "store/user/userSelector";
import httpClient from "axios/server";

interface IMainLayout {
  title: React.ReactNode;
  headTitle: string;
}

const MainLayout: FC<IMainLayout> = ({ children, title, headTitle }) => {
  const user = useAppSelector(selectorUser);

  httpClient.interceptors.request.use(function (config) {
    user.accessToken
      ? (config.headers.Authorization = `Bearer ${user.accessToken}`)
      : null;
    return config;
  });

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Wrapper>
        <Header>
          <HeaderWrapper>
            <DarkLogo />
            <HeaderTitle>ACCELERIST</HeaderTitle>
          </HeaderWrapper>
          {user.firstName ? user.firstName + user.lastName : "No name"}
        </Header>
        <Title>{title}</Title>
        <Content>
          <Main>{children}</Main>
        </Content>
      </Wrapper>
    </>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  min-width: 1366px;
  & > * {
    font-family: "Rubik", sans-serif;
  }
`;

const Title = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100px;
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
`;

const Content = styled.main`
  background: rgba(239, 236, 236, 0.36);
  flex: 1 1 auto;
`;
const Main = styled.div`
  width: 83%;
  padding: 0 0 0 15%;
`;

const Header = styled.header`
  width: 100%;
  height: 80px;
  min-height: 80px;
  padding: 0 0 0 15%;
  display: flex;
  align-items: center;
  justify-content: start;
  background: #d4f3ff;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  min-width: 80%;
`;

const HeaderTitle = styled.p`
  padding-left: 10px;
`;
