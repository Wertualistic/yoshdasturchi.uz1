import React, { useEffect, useState, memo, useRef } from "react";
import { Statistic } from "antd";
import Image from "next/image";
import styles from "../Navbar/Navbar.module.scss";
import { useRouter } from "next/router";
import { TimerImageDark } from "@/assets";
import TimerImage from "../../assets/timer.svg";
import { DataContext } from "@/DataContext";

const { Countdown } = Statistic;

const Timer = ({ selectedTheme, startTime, setStartTime }) => {
  const router = useRouter();

  const onChange = (val) => {
    if (val < 1000) {
      setStartTime(false);
      return router.push("/result", undefined, { shallow: true });
    }
  };

  return (
    <div className={styles.navbar__time}>
      {selectedTheme === "dark" ? (
        <Image src={TimerImageDark} alt="img" />
      ) : (
        <Image src={TimerImage} alt="img" />
      )}
      <p>Vaqt</p>
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
    </div>
  );
};

export default memo(Timer);
