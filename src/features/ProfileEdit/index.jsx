import React, { useEffect, useState } from "react";
import styles from "./ProfileEdit.module.scss";
import Image from "next/image";
import api from "@/utils/api";
import { useRouter } from "next/router";

const ProfileEdit = () => {
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    region: "",
    surname: "",
    name: "",
    age: "",
    phoneNumber: "",
    passwords: "",
  });

  const updateToken = (token) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.status == 200) {
          const userData = res.data;
          setUserInfo(userData);
          setFormData({
            region: userData.region,
            surname: userData.surname,
            name: userData.name,
            age: userData.age,
            phoneNumber: userData.phoneNumber,
            passwords: "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (typeof window !== "undefined") {
      getUserInfo();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/user/updateInformation", formData);
      if (response.status === 200) {
        const newToken = response.data.obj;
        updateToken(newToken);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };
  return (
    <div className={styles.ProfileEditAll}>
      <div className={styles.ProfileEditForm}>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          method="POST"
          className={styles.ProfileEditFormInputs}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.ProfileEditFormInput}>
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
                  <option value="ToshkentRegion">Toshkent Viloyati</option>
                  <option value="Fargona">{`Farg'ona`}</option>
                  <option value="Xorazm">Xorazm</option>
                </select>
              </div>
            </div>

            <div className={styles.ProfileEditFormInput}>
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
            <div className={styles.ProfileEditFormInput}>
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
            <div className={styles.ProfileEditFormInput}>
              <label htmlFor="age">Yoshingiz</label>
              <input
                type="text"
                name="age"
                placeholder="Yoshingizni kiriting"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.ProfileEditFormInput}>
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
            <div className={styles.ProfileEditFormInput}>
              <label htmlFor="passwords">Parol</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwords"
                  placeholder="Parol kiriting"
                  value={formData.passwords}
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
            <div className={styles.ProfileEditFormInput}>
              <label htmlFor="passwordRepeat">Parolni takrorlang</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPasswordRepeat ? "text" : "password"}
                  name="passwordRepeat"
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
          <button name="submit">Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
