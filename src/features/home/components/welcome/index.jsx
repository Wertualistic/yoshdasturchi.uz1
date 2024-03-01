import React, { useContext } from "react";
import styles from "./Welcome.module.scss";
import Link from "next/link";

const Welcome = ({ handleEnterClick }) => {
  return (
    <div className={styles.welcome_sec}>
      <div className={styles.welcome_inner}>
        <div className={styles.top}>
          <h2>Xush kelibsiz!</h2>
          <p>
            ENTER tugmasini bosing va quyida chiqadigan harflarni klaviaturadan
            kiriting. Omad!
          </p>
        </div>
        <hr />
        <div className={styles.bottom}>
          <h3>Boshlash uchun</h3>
          <span onClick={handleEnterClick}>Enter</span>
          <h3>tugmasini bosing!</h3>
        </div>
        <Link href="https://www.youtube.com/shorts/_MPmwJwISQw?feature=share">
          Musobaqa sovrinlari haqida batafsil {`ma\'lumot`}
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
