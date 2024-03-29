import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import Link from "next/link";
import getDeviceIp from "@/utils/getDeviceIp";
import { useRouter } from "next/router";
import Image from "next/image";
import { RegisterFrame } from "@/assets";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    deviceIp: "",
  });
  const router = useRouter();

  useEffect(() => {
    getDeviceIp().then((ip) => {
      setFormData((prevData) => ({ ...prevData, deviceIp: ip }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "phoneNumber") {
      updatedFormData = {
        ...updatedFormData,
        validation: false,
      };
    }

    setFormData(updatedFormData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const setCookie = (key, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
  };

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.yoshdasturchi.uz/api/v1/auth/login",
        formData,
        { headers: { Server: "webname" } }
      );
      if (response.status === 200) {
        const lastContest = JSON.parse(
          sessionStorage.getItem("lastContest") || []
        );
        const data = response.data;
        setCookie("token", data.object, 100); // set cookie to expire in 100 days
        setCookie("status", lastContest.status, 100); // set cookie to expire in 100 days
        window.location.href = "/";
      }
      if (
        formData.phoneNumber == "+998950960153" ||
        formData.password == "admin"
      ) {
        window.location.href = "/admin";
      } else {
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.LoginImage}>
        <Image
          className={styles.LoginImg}
          src={RegisterFrame}
          alt="Register Frame"
        />
      </div>
      <div className={styles.LoginForm}>
        <form
          autoComplete="off"
          method="POST"
          className={styles.LoginFormInputs}
          onSubmit={handleSubmit}>
          <div>
            <h1>Kirish</h1>
            <p>Kirish uchun {`ma\'lumotlarni`} kiriting</p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.LoginFormInput}>
              <label htmlFor="phone">Telefon Raqam</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Telefon raqamingizni kiriting"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.LoginFormInput}>
              <label htmlFor="password">Parol</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Parol kiriting"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <div
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibility}>
                  <i className={`ri-eye-${showPassword ? "off-" : ""}line`}></i>
                </div>
              </div>
            </div>
          </div>
          <button name="submit">Kirish</button>
          <p className={styles.LoginSignIn}>
            {`Akkauntingiz yo\'qmi?`}
            <Link style={{ textDecoration: "none" }} href="/register">
              <span>{`Ro\'yxatdan o\'tish`}</span>
            </Link>
          </p>
        </form>
        <Link style={{ textDecoration: "none" }} href="/">
          <span style={{ color: "red" }}>Asosiy sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
