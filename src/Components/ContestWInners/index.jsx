import React from "react";
import styles from "./ContestWinners.module.scss";
import Link from "next/link";

const ContestWInners = ({ isAdsShow }) => {
  return (
    <>
      {isAdsShow && (
        <div className={styles.telegram_group_sec}>
          <div className={styles.telegram_group_inner}>
            <h4>
              Musobaqa {`g'oliblarini`} telegram kanalimizda {`e'lon`} qilamiz
            </h4>
            <button>
              <Link href="https://t.me/yoshdasturchi_uzb">Kanalga o’tish</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContestWInners;
