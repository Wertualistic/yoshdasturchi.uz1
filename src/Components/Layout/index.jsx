import React, { useEffect } from "react";
import Navbar from "../Navbar/index";
import Footer from "../Footer";
import api from "@/utils/api";

const MainLayout = ({ children }) => {
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.status == 200) {
          const userData = res.data;
          sessionStorage.setItem("userData", JSON.stringify(userData));
        }
      } catch (err) {
        return false;
      }
    };
    // Suppress console output
    console.log = function () {};
    console.error = function () {};
    console.warn = function () {};

    // Set cookie
    const setCookie = (key, value, days) => {
      if (!days || isNaN(days)) {
        console.error("Invalid number of days for cookie expiration");
        return;
      }

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
      document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
    };

    setCookie("status", "JARAYONDA", 100); // set cookie to expire in 100 days

    // Yandex.Metrika counter initialization
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
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(96618625, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    });

    // Disable context menu and certain key combinations
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    document.onkeydown = function (e) {
      if (
        e.keyCode == 123 ||
        (e.ctrlKey && e.shiftKey && e.keyCode == 73) ||
        (e.ctrlKey && e.shiftKey && e.keyCode == 74) ||
        (e.ctrlKey && e.keyCode == 85)
      ) {
        return false;
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      <div className="mobile_content">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <iframe
                width="100%"
                height="550"
                src="https://www.youtube.com/embed/_MPmwJwISQw"
                title="Yoshdasturchi.uz - tez yozish musobaqasi!"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
              <div className="scrolling-text-container">
                <div className="scrolling-text">
                  Musobaqada hamda klaviaturada yozish uchun, faqatgina
                  kompyuter orqali kira olasiz!
                </div>
              </div>
              <a
                className="btn btn-success btn-sm mb-3"
                href="https://t.me/yoshdasturchiuz_group">
                Telegram guruhga {`o\'tish`}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hideSite">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
