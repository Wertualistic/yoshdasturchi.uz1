import React, { useState, useEffect } from "react";
import styles from "./ContestDate.module.scss";
import axios from "axios";
import api from "@/utils/api";

const ContestDate = ({ isAdsShow, isHaveNavbar }) => {
  const [contest, setContest] = useState(
    JSON.parse(sessionStorage.getItem("lastContest")) || []
  );

  const calculateTimeLeft = () => {
    const difference =
      contest.status == "BOSHLANMAGAN"
        ? +new Date(contest.startAt) - +new Date()
        : +new Date(contest.endAt) - +new Date();
    if (difference < 0) {
      const updateContest = async () => {
        try {
          const res = await axios.put(
            `https://api.yoshdasturchi.uz/api/v1/contest/updateStatus/${contest.id}?status=JARAYONDA`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTUwOTYwMTUzIiwiaWF0IjoxNzA4NzYxODM3LCJleHAiOjg2NDAwMDE3MDg3NjE4Mzd9.FB9OblciIcWYfarIocDil_FS3PWflFXGKon-bWZODbk",
              },
            }
          );
          sessionStorage.setItem("lastContest", JSON.stringify(res.data));
          setContest(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      updateContest();
    }
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
    if (num === undefined) {
      return "";
    }
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
          {contest.status !== "TUGADI" ? (
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
            {contest.status == "JARAYONDA" ? (
              <span>Musobaqa tugashigacha</span>
            ) : contest.status == "BOSHLANMAGAN" ? (
              <span>Musobaqa boshlanishigacha</span>
            ) : (
              ""
            )}
            <h3>
              {contest.status !== "TUGADI" ? (
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
