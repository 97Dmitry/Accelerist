import { FC } from "react";
import styled from "styled-components";

interface ILogo {
  width?: number;
  height?: number;
}

const Logo: FC<ILogo> = ({ width, height }) => {
  return (
    <>
      <Wrapper>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="1.01408"
            height="10.8"
            transform="matrix(1 0 0 -1 17.2393 10.7999)"
            fill="#FFDA00"
          />
          <rect
            width="1.01408"
            height="10.8"
            transform="matrix(1 0 0 -1 17.2393 35.9999)"
            fill="#F6921E"
          />
          <rect
            width="1.02135"
            height="17.8736"
            transform="matrix(0.702074 0.712104 0.702074 -0.712104 17.2393 17.8706)"
            fill="#E92D30"
          />
          <rect
            width="1.02135"
            height="17.8736"
            transform="matrix(-0.702074 0.712104 -0.702074 -0.712104 30.5049 30.2136)"
            fill="#E92D30"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.1673 18.0415L18.3358 17.8707L5.78714 5.14282L5.07007 5.87013L16.5221 17.4857L4.4327e-08 17.4857L0 18.5143L16.6054 18.5143L5.07079 30.2136L5.78785 30.9409L18.3365 18.2131L18.1673 18.0415Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.9996 17.9999L30.1686 12.3428L29.6233 12.9189L34.4785 17.4856H27.3799V18.5142H34.4785L29.6232 23.5952L30.1686 24.1713L35.9996 17.9999Z"
            fill="white"
          />
        </svg>
      </Wrapper>
    </>
  );
};

export default Logo;

const Wrapper = styled.div``;
