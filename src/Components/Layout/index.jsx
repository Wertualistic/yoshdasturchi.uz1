import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/index";
import Footer from "../Footer";
import api from "@/utils/api";
import { ToastContainer } from "react-toastify";

const MainLayout = ({ children }) => {
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.status === 200) {
          const userData = res.data;
          if (typeof window !== "undefined") {
            sessionStorage.setItem("userData", JSON.stringify(userData));
          }
        }
      } catch (err) {
        console.error("Failed to fetch user information:", err);
      }
    };

    if (typeof window !== "undefined") {
      const lastContest =
        JSON.parse(sessionStorage.getItem("lastContest")) || [];

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

      setCookie("status", lastContest.status, 100); // set cookie to expire in 100 days

      // Disable context menu and certain key combinations
      document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );

      document.onkeydown = function (e) {
        if (
          e.keyCode === 123 ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
          (e.ctrlKey && e.keyCode === 85)
        ) {
          return false;
        }
      };

      getUserInfo();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="mobile_content">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <iframe
                width="100%"
                height="550"
                src="https://www.youtube.com/embed/_MPmwJwISQw"
                title="Yoshdasturchi.uz - tez yozish musobaqasi!"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
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
