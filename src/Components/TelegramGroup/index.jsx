import React from "react";
import styles from "./TelegramGroup.module.scss";
import Link from "next/link";

const TelegramGroup = ({ isAdsShow }) => {
  return (
    <>
      {isAdsShow && (
        <div className={styles.telegram_group_sec}>
          <div className={styles.telegram_group_inner}>
            <h3>Savollaringiz bormi ?</h3>
            <h4>Telegram guruximizga murojat qiling</h4>
            <button>
              <Link href="https://t.me/yoshdasturchiuz_group">
                Guruxga o’tish
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TelegramGroup;
