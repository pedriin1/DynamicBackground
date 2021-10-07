import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
// eslint-disable-next-line react/display-name
export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // eslint-disable-next-line react/display-name
      ctx.renderPage = () =>
        // eslint-disable-next-line react/display-name
        originalRenderPage({
          // eslint-disable-next-line react/display-name
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            <title>Nosso Role</title>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="shortcut icon" href="/img/onlylogo.svg" />
            <meta property="og:image" content="/NossoRoleFull.jpg" />

            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
              rel="stylesheet"
            ></link>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
