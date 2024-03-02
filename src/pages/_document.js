import React, { useEffect } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => (
  <Html lang="en">
    <Head>
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <link rel="icon" href="https://yt3.googleusercontent.com/AgmPvalR4GP06EtC2ZfWhs8eamhIBN6hQUF5yaEaMkDNkyyl_rdnkgi-oe9GJkSaRC58DiHuOE8=s176-c-k-c0x00ffffff-no-rj"
        type="image/x-icon" />
    </Head>
    <body>
      <Main />
      <NextScript />
      <div dangerouslySetInnerHTML={{ __html: fs.readFileSync(path.join(__dirname, 'metrika.html'), 'utf8') }} />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;  