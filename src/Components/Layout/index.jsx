import React, { useEffect } from "react";
import Navbar from "../Navbar/index";
import Footer from "../Footer";

const MainLayout = ({ children }) => {
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
