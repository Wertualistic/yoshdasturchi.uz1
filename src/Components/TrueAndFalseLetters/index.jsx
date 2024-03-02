import React, { useEffect, useState } from "react";
import styles from "./TrueAndFalseLetters.module.scss";
import { useRouter } from "next/router";

const TrueAndFalseLetters = ({ result, isAdsShow }) => {
  const router = useRouter();
  const [data1, setData1] = useState([]);
  const [data0, setData0] = useState([]);
  useEffect(() => {
    const newData1 = result.filter((point) => point === 1);
    const newData0 = result.filter((point) => point === 0);
    if (data0.length >= 12) {
      alert("Xatolaringiz 12 tadan oshib ketdi qaytadan urinib koring!");
      router.reload();
    }
    setData1(newData1);
    setData0(newData0);
  }, [result]);
  return (
    <>
      {isAdsShow && (
        <div className={styles.TrueAndFalseLetters_sec}>
          <div className={styles.TrueAndFalseLetters_inner}>
            <div className={styles.true}>
              <span>{`To'g'ri`}</span> <p>{data1.length}</p>
            </div>
            <div className={styles.false}>
              <span>{`Noto'g'ri`}</span> <p>{data0.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrueAndFalseLetters;
