import api from "@/utils/api";
import Link from "next/link";
import React, { useEffect } from "react";

const Admin = () => {
  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.data.systemRoleName !== "ROLE_ADMIN") {
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, []);
  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <Link href="/admin/activeUsers">Active userlar</Link>
      <Link href="/admin/inactiveUsers">Active emas userlar</Link>
    </div>
  );
};

export default Admin;
