import type { AppProps } from "next/app";
import styled from "styled-components";

import Global from "styles/globalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Wrapper>
      <Global />
      <Component {...pageProps} />
    </Wrapper>
  );
}
export default MyApp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
