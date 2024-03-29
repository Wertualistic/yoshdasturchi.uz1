import "@/styles/globals.css";
import { MainLayout } from "@/Components";
import { DataProvider } from "@/DataContext";
import Head from "next/head";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { logo } from "@/assets";

export default function App({ Component, pageProps }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <p>Disconnected from internet!!!</p>;
  } else {
    return (
      <DataProvider>
        <Head>
          <meta name="description" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
          <meta name="robots" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
          <meta name="googlebot" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
          <meta name="google" content="klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz" />
          <meta name="keywords" content="HTML, CSS, JavaScript, klaviaturada tez yozish, klaviaturada tez yozish online, klaviaturada tez yozish o'yin, Islombek Baxromov, alicoder, alicoder.uz, amaliyot, klaviaturada, klaviatura, islom, baxromov, tez yozish, klaviaturada yozish" />
          <meta name="author" content="Islom Baxromov || Alicoder.uz || Alicoder" />
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
}
