import "@/styles/globals.css";
import { MainLayout } from "@/Components";
import { DataProvider } from "@/DataContext";
import Head from "next/head";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Yandex.Metrika counter script
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(95260097, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: "dataLayer"
    });
  }, []);

  return (
    <DataProvider>
      <Head>
        <meta name="description" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="robots" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="googlebot" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="google" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="keywords" content="HTML, CSS, JavaScript, klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz, amaliyot, klaviaturada, klaviatura, islom, baxromov, tez yozish, klaviaturada yozish" />
        <meta name="author" content="Islom Baxromov || Alicoder.uz || Alicoder" />
        <link rel="icon" type="image/x-icon" href="logo1.jpg" />
      </Head>
      <MainLayout>
        <div className="minHeight">
          <Component {...pageProps} />
        </div>
      </MainLayout>
    </DataProvider>
  );
}
