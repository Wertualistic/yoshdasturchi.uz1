import React, { useState, useEffect, useRef, useContext } from "react";
import TimerImage from "../../assets/timer.svg";
import Image from "next/image";
import styles from "../Navbar/Navbar.module.scss";
import { DataContext } from "@/DataContext";
import { TimerImageDark } from "@/assets";

const Timer = ({ selectedTheme }) => {
  const { time } = useContext(DataContext);

  return (
    <>
      <div className={styles.navbar__time}>
        {selectedTheme === "dark" ? (
          <Image src={TimerImageDark} alt="img" />
        ) : (
          <Image src={TimerImage} alt="img" />
        )}
        <p>Vaqt</p>
        <p>{time} sec</p>
      </div>
    </>
  );
};

export default Timer;
