import React from "react";
import styles from "./TelegramGroup.module.scss";

const TelegramGroup = ({ isAdsShow }) => {
  return (
    <>
      {isAdsShow && (
        <div className={styles.telegram_group_sec}>
          <div className={styles.telegram_group_inner}>
            <h3>Savollaringiz bormi ?</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default TelegramGroup;
