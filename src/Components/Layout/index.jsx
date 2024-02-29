import React, { useEffect } from "react";
import Navbar from "../Navbar/index";
import Footer from "../Footer";

const MainLayout = ({ children }) => {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};
  useEffect(() => {
    // Yandex.Metrika counter script
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      (k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(95260097, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: "dataLayer",
    });
  }, []);
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    document.onkeydown = function (e) {
      // disable F12 key
      if (e.keyCode == 123) {
        return false;
      }

      // disable I key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        return false;
      }

      // disable J key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        return false;
      }

      // disable U key
      if (e.ctrlKey && e.keyCode == 85) {
        return false;
      }
    };
  }, []);
  const setCookie = (key, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
  };
  useEffect(() => {
    setCookie("status", "JARAYONDA", 100); // set cookie to expire in 100 days
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
