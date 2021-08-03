import Logo from "assets/svg/Logo";
import httpClient from "axios/server";
import { NextComponentType } from "next";
import Head from "next/head";
import { useAppSelector } from "store/hooks";
import { selectorUser } from "store/user/userSelector";
import styled from "styled-components";

interface IAuthLayout {}

const AuthLayout: NextComponentType<IAuthLayout> = ({ children }) => {
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
        <title>AUTHORIZATION</title>
      </Head>
      <Wrapper>
        <Header>
          <Logo />
          <Text>ACCELERIST</Text>
        </Header>
        {children}
      </Wrapper>
    </>
  );
};

export default AuthLayout;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  background: url(/auth-bg.png) 50% 50% / cover no-repeat;

  & > * {
    font-family: "Rubik", sans-serif;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 80px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #122434;

  @media (max-width: 1366px) {
    height: 40px;
    min-height: 40px;
  }
`;

const Text = styled.p`
  margin-left: 15px;
  color: #fff;

  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;

  letter-spacing: 0.2em;
`;
