import React, { useEffect, useState } from "react";
import styles from "./ProfileEdit.module.scss";
import Image from "next/image";
import api from "@/utils/api";
import { useRouter } from "next/router";

const ProfileEdit = () => {
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [passwordvalidation, setPasswordValidation] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const router = useRouter();
  const [validation, setValidation] = useState(false);
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
    let updatedFormData = { ...formData, [name]: value };

    if (name === "phoneNumber") {
      updatedFormData = {
        ...updatedFormData,
        validation: false,
      };
    }

    setFormData(updatedFormData);
  };

  const handlePasswordChange = (e) => {
    setRepeatPassword(e.target.value);
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
    if (formData.passwords === repeatPassword) {
      setPasswordValidation(false);
      try {
        const response = await api.put("/user/updateInformation", formData);
        if (response.status === 200) {
          const newToken = response.data.obj;
          updateToken(newToken);
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setPasswordValidation(true);
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
            {/* <div className={styles.ProfileEditImage}>
              <label
                htmlFor="profileImage"
                className={styles.profileImageUploadButton}>
                {image ? (
                  <Image
                    className={styles.UploadedImage}
                    src={URL.createObjectURL(image)}
                    alt="Yangilandi"
                    width={100}
                    height={100}
                  />
                ) : (
                  <span>+</span>
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div> */}

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
              {validation ? (
                <div>
                  <input
                    style={{ border: "1px solid red" }}
                    type="text"
                    name="phoneNumber"
                    placeholder="Telefon raqamingizni kiriting"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  {validation && (
                    <p
                      style={{ color: "red", margin: "0", fontSize: "0.9rem" }}>
                      Telefon raqamingizni {`to\'g\'ri`} formatda kiriting
                      (+998XXXXXXXXX).
                    </p>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Telefon raqamingizni kiriting"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
            <div className={styles.ProfileEditFormInput}>
              <label htmlFor="password">Parol</label>
              <div className={styles.passwordInputContainer}>
                {passwordvalidation ? (
                  <input
                    style={{ border: "1px solid red" }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Parol kiriting"
                    value={formData.passwords}
                    onChange={handleChange}
                    autoComplete="new-password"
                    pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
                  />
                ) : (
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Parol kiriting"
                    value={formData.passwords}
                    onChange={handleChange}
                    autoComplete="new-password"
                    pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
                  />
                )}
                <div
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibility}>
                  <i className={`ri-eye-${showPassword ? "off-" : ""}line`}></i>
                </div>
              </div>
              {passwordvalidation && (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Parol 8 ta belgidan {`ko\'p`}, 1 ta raqam va 1 ta katta harf
                  kerak.
                </p>
              )}
            </div>
            <div className={styles.ProfileEditFormInput}>
              <label htmlFor="passwordRepeat">Parolni takrorlang</label>
              <div className={styles.passwordInputContainer}>
                {passwordvalidation ? (
                  <input
                    style={{ border: "1px solid red" }}
                    type={showPasswordRepeat ? "text" : "password"}
                    name="passwordRepeat"
                    value={repeatPassword}
                    onChange={handlePasswordChange}
                    placeholder="Parol takrorlang"
                    autoComplete="new-password"
                  />
                ) : (
                  <input
                    type={showPasswordRepeat ? "text" : "password"}
                    name="passwordRepeat"
                    value={repeatPassword}
                    onChange={handlePasswordChange}
                    placeholder="Parol takrorlang"
                    autoComplete="new-password"
                  />
                )}
                <div
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibilityRepeat}>
                  <i
                    className={`ri-eye-${
                      showPasswordRepeat ? "off-" : ""
                    }line`}></i>
                </div>
              </div>
              {passwordvalidation && (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Parol bir xil emas.
                </p>
              )}
            </div>
          </div>
          <button name="submit">Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
