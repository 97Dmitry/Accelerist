import type { AppProps } from "next/app";
import styled from "styled-components";
import { PersistGate } from "redux-persist/integration/react";

import Global from "styles/globalStyle";
import wrapper from "store";

import { store } from "store/store";

function App({ Component, pageProps }: AppProps) {
  // @ts-ignore

  const getLayout = Component.getLayout || ((page) => page);
  return (
    //@ts-ignore
    <PersistGate loading={null} persistor={store.__persistor}>
      {getLayout(
        <Wrapper>
          <Global />
          <Component {...pageProps} />
        </Wrapper>
      )}
    </PersistGate>
  );
}
export default wrapper.withRedux(App);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
