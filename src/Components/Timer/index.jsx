import React, { useEffect, useState, memo } from "react";
import { Statistic } from "antd";
import Image from "next/image";
import styles from "../Navbar/Navbar.module.scss";
import { useRouter } from "next/router";
import { TimerImageDark } from "@/assets";
import TimerImage from "../../assets/timer.svg";

const { Countdown } = Statistic;

const Timer = ({ selectedTheme, startTime }) => {
  const router = useRouter();
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (timerFinished) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event) => {
      if (timerFinished) {
        event.preventDefault();
      }
    };

    if (timerFinished) {
      document.addEventListener("keypress", handleKeyPress);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [timerFinished]);

  const handleFinish = () => {
    router.push("/result", undefined, { shallow: true });
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
              onFinish={handleFinish}
            />
          ) : (
            60
          )}
        </p>
    </div>
  );
};

export default memo(Timer);
