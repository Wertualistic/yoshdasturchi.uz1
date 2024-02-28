import "@/styles/globals.css";
import { MainLayout } from "@/Components";
import { DataProvider } from "@/DataContext";
import Head from "next/head";
import { useEffect } from "react";
import api from "@/utils/api";
import { logo } from "@/assets";

export default function App({ Component, pageProps }) {

  return (
    <DataProvider>
      <Head>
        <meta name="description" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="robots" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="googlebot" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="google" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
        <meta name="keywords" content="HTML, CSS, JavaScript, klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz, amaliyot, klaviaturada, klaviatura, islom, baxromov, tez yozish, klaviaturada yozish" />
        <meta name="author" content="Islom Baxromov || Alicoder.uz || Alicoder" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="icon" href="https://yt3.googleusercontent.com/AgmPvalR4GP06EtC2ZfWhs8eamhIBN6hQUF5yaEaMkDNkyyl_rdnkgi-oe9GJkSaRC58DiHuOE8=s176-c-k-c0x00ffffff-no-rj"
          type="image/x-icon" />
        <title>Yoshdasturchi</title>
      </Head>
      <MainLayout  >
        <div className="minHeight">
          <Component  {...pageProps} />
        </div>
      </MainLayout>
    </DataProvider>
  );
}
