import { FC } from "react";
import styled from "styled-components";

interface IMainLayout {}

const MainLayout: FC<IMainLayout> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainLayout;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 850px;
  margin: 0 auto;
  height: 100vh;
`;
