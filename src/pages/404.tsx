import { NextComponentType } from "next";
import Link from "next/link";
import styled from "styled-components";

interface INotFound {}

const NotFound: NextComponentType<INotFound> = ({}) => {
  return (
    <>
      <Wrapper>
        <p>
          <strong>Please, go HOME, until it&apos;s not too late</strong>
        </p>
        <p>
          <Link href={"/"}>HOME</Link>
        </p>
      </Wrapper>
    </>
  );
};

export default NotFound;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & a {
    text-decoration: none;
    color: #0ce78c;
    transition: 0.3s;
    &:hover {
      color: #115237;
    }
  }
`;
