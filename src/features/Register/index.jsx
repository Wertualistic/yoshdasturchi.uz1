import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Register.module.scss";
import Link from "next/link";
import Image from "next/image";
import { RegisterFrame } from "@/assets";
import { useRouter } from "next/router";
import getDeviceIp from "@/utils/getDeviceIp";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const router = useRouter();
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    surname: "",
    age: "",
    deviceIp: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    getDeviceIp().then((ip) => {
      setFormData((prevData) => ({ ...prevData, deviceIp: ip }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  const handlePasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
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
    if (formData.password !== repeatPassword) {
      toast.error("Parol bir xil emas!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        const response = await axios.post(
          "https://api.yoshdasturchi.uz/api/v1/auth/register",
          formData,
          { headers: { Server: "webname" } }
        );
        if (response.status === 200) {
          const data = response.data;
          setCookie("token", data.object, 100);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 409) {
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
        }
      }
    }
  };
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.push("/");
    }
  });

  return (
    <div className={styles.RegisterContainer}>
      <div className={styles.RegisterImage}>
        <Image
          className={styles.RegisterImg}
          src={RegisterFrame}
          alt="Register Frame"
        />
      </div>
      <div className={styles.RegisterForm}>
        <form
          autoComplete="off"
          method="POST"
          className={styles.RegisterFormInputs}
          onSubmit={handleSubmit}>
          <div>
            <h1>Ro’yxatda o’tish</h1>
            <p>Ro’yxatdan o’tish uchun shaxsiy ma’lumotlaringizni kiriting</p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="region">Viloyat</label>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.selectDropdown}
                  name="region"
                  id="region"
                  required
                  value={formData.region}
                  onChange={handleChange}>
                  <option value="" disabled>
                    Viloyatni tanlang
                  </option>
                  <option value="Toshkent">Tashkent Shahri</option>
                  <option value="Qoraqalpogiston">
                    {`Qoraqalpog\'iston Respublikasi`}
                  </option>
                  <option value="Andijon">Andijon</option>
                  <option value="Buxoro">Buxoro</option>
                  <option value="Jizzax">Jizzax</option>
                  <option value="Qashqadaryo">Qashqadaryo</option>
                  <option value="Navoiy">Navoiy</option>
                  <option value="Namangan">Namangan</option>
                  <option value="Samarqand">Samarqand</option>
                  <option value="Surxandaryo">Surxondaryo</option>
                  <option value="Sirdaryo">Sirdaryo</option>
                  <option value="Fargona">{`Farg'ona`}</option>
                  <option value="Xorazm">Xorazm</option>
                </select>
              </div>
            </div>

            <div className={styles.RegisterFormInput}>
              <label htmlFor="name">Ism</label>
              <input
                type="text"
                name="name"
                placeholder="Ismingizni kiriting"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="surname">Familya</label>
              <input
                type="text"
                name="surname"
                placeholder="Familyangizni kiriting"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="age">Yoshingiz</label>
              <input
                type="number"
                name="age"
                placeholder="Yoshingizni kiriting"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="phone">Telefon Raqam</label>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Telefon raqamingizni kiriting"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.RegisterFormInput}>
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
            <div className={styles.RegisterFormInput}>
              <label htmlFor="passwordRepeat">Parolni takrorlang</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPasswordRepeat ? "text" : "password"}
                  name="passwordRepeat"
                  value={repeatPassword}
                  onChange={handlePasswordChange}
                  placeholder="Parol takrorlang"
                  autoComplete="new-password"
                  required
                />
                <div
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibilityRepeat}>
                  <i
                    className={`ri-eye-${
                      showPasswordRepeat ? "off-" : ""
                    }line`}></i>
                </div>
              </div>
            </div>
          </div>
          <button name="submit">Akkaunt yaratish</button>
          <p className={styles.RegisterSignIn}>
            Akkauntingiz bormi?{" "}
            <Link style={{ textDecoration: "none" }} href="/login">
              <span>Kirish</span>
            </Link>
            <br />
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
