import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/*<style data-href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap">*/}
          {/*  @font-face{font-family:'Inter';font-style:normal;}*/}
          {/*  </style>*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;