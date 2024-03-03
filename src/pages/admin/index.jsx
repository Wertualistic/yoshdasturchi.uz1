import api from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect } from "react";
import { Next } from "@/assets";
import styles from "./admin.module.scss";

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.data.systemRoleName !== "ROLE_ADMIN") {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
        if (err.response.status === 409) {
          router.push("/");
        }
      }
    };
    getUserInfo();
  }, [router]);
  return (
    <div
      className={styles.adminmenu}
      style={{
        display: "flex",
        gap: "50px",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <button className={styles.cta}>
        <Link
          className={styles.hover_underline_animation}
          href="/admin/activeUsers"
          onClick={() => (window.location.href = "/admin/activeUsers")}>
          Active userlar
        </Link>
        <Image src={Next} alt="img" />
      </button>
      <button className={styles.cta}>
        <Link
          className={styles.hover_underline_animation}
          href="/admin/inactiveUsers">
          Active emas userlar
        </Link>
        <Image src={Next} alt="img" />
      </button>
    </div>
  );
};

export default Admin;
