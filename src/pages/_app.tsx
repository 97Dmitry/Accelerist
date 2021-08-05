import type { AppProps } from "next/app";
import styled from "styled-components";
// import { PersistGate } from "redux-persist/integration/react";

import Global from "styles/globalStyle";
import { wrapper } from "store";
import { useStore } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  const store = useStore();

  //@ts-ignore
  const getLayout = Component.getLayout || ((page) => page);
  return (
    //@ts-ignore
    // <PersistGate loading={null} persistor={store.__persistor}>
    <Wrapper>
      {getLayout(
        <>
          <Global />
          <Content>
            <Component {...pageProps} />
          </Content>
        </>
      )}
    </Wrapper>
    // </PersistGate>
  );
}
export default wrapper.withRedux(App);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  height: 100%;
`;
