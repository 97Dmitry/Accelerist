import type { AppProps } from "next/app";
import styled from "styled-components";

import store from "store";
import { Provider } from "react-redux";

import Global from "styles/globalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Wrapper>
      <Provider store={store}>
        <Global />
        <Component {...pageProps} />
      </Provider>
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
