import React, { useState, useEffect } from "react";
import styles from "./ContestDate.module.scss";

const ContestDate = ({ isAdsShow, isHaveNavbar }) => {
  const contest = JSON.parse(localStorage.getItem("lastContest"));

  const calculateTimeLeft = () => {
    const difference = +new Date(contest.endAt) - +new Date();
    let timeLeft = {};
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / millisecondsPerDay),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const padZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <div
        className={
          isHaveNavbar
            ? styles.contestdate_sec_nav
            : styles.contestdate_sec_none
        }>
        <div className={styles.contestdate_inner}>
          {timeLeft.days > 0 ? (
            <h3>{`${padZero(timeLeft.days)}:${padZero(
              timeLeft.hours
            )}:${padZero(timeLeft.minutes)}:${padZero(timeLeft.seconds)}`}</h3>
          ) : (
            <h3 style={{ whiteSpace: "nowrap" }}>Musobaqa tugadi!</h3>
          )}
        </div>
      </div>
      {isAdsShow && (
        <div className={styles.contestdate_sec_ads}>
          <div className={styles.contestdate_inner}>
            {timeLeft.days >= 0 ? <span>Musobaqa tugashigacha</span> : ""}
            <h3>
              {timeLeft.days > 0 ? (
                `${padZero(timeLeft.days)}:${padZero(timeLeft.hours)}:${padZero(
                  timeLeft.minutes
                )}:${padZero(timeLeft.seconds)}`
              ) : (
                <span className={styles.countdown}>
                  Musobaqa tugadi, bizni telegramda kuzatib boring!
                </span>
              )}
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default ContestDate;
