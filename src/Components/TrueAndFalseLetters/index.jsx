import React, { useEffect, useState } from "react";
import styles from "./TrueAndFalseLetters.module.scss";

const TrueAndFalseLetters = ({ result, isAdsShow }) => {
  const [data1, setData1] = useState([]);
  const [data0, setData0] = useState([]);

  useEffect(() => {
    const newData1 = result.filter((point) => point === 1);
    const newData0 = result.filter((point) => point === 0);
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
