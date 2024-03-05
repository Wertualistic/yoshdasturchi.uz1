import React, { useState, useEffect, useRef, useContext, memo } from "react";
import TimerImage from "../../assets/timer.svg";
import { Statistic } from "antd";
import Image from "next/image";
import styles from "../Navbar/Navbar.module.scss";
import { DataContext } from "@/DataContext";
import { TimerImageDark } from "@/assets";
import { useRouter } from "next/router";

const Timer = ({ selectedTheme, startTime }) => {
  const router = useRouter();
  const { Countdown } = Statistic;
  const onChange = (val) => {
    if (val < 0) {
      router.push("/result", undefined, { shallow: true });
    }
  };

  return (
    <>
      <div className={styles.navbar__time}>
        {selectedTheme === "dark" ? (
          <Image src={TimerImageDark} alt="img" />
        ) : (
          <Image src={TimerImage} alt="img" />
        )}
        <p>Vaqt</p>
        {/* {WriteTime()} */}
        <p>
          {startTime ? (
            <Countdown
              className={styles.count}
              value={Date.now() + 60 * 1000}
              format="ss"
              onChange={onChange}
            />
          ) : (
            60
          )}
        </p>
        {/* <p>{time} sec</p> */}
      </div>
    </>
  );
};

export default memo(Timer);
