import React, { useEffect } from "react";
import Navbar from "../Navbar/index";
import Footer from "../Footer";

const MainLayout = ({ children }) => {
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
