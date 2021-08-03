import { NextComponentType } from "next";
import styled from "styled-components";

import DarkLogo from "assets/svg/DarkLogo";
import { useAppSelector } from "store/hooks";
import { selectorUser } from "store/user/userSelector";
import httpClient from "axios/server";

interface IMainLayout {}

const MainLayout: NextComponentType<IMainLayout> = ({ children }) => {
  const user = useAppSelector(selectorUser);

  httpClient.interceptors.request.use(function (config) {
    user.accessToken
      ? (config.headers.Authorization = `Bearer ${user.accessToken}`)
      : null;
    return config;
  });

  return (
    <>
      <Header>
        <HeaderWrapper>
          <DarkLogo />
          <HeaderTitle>ACCELERIST</HeaderTitle>
        </HeaderWrapper>
        {user.firstName ? user.firstName + user.lastName : "No name"}
      </Header>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default MainLayout;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  height: 60px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d4f3ff;

  & > :first-child {
    width: 1000px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.p`
  margin-left: 10px;
`;
