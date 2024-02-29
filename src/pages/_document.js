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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    </Head>
    <body>
      <Main />
      <NextScript />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(95260097, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                      webvisor: true,
                      ecommerce: "dataLayer",
                });
              `,
        }}
      />
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/12345678" style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
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