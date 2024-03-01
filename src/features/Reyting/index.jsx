import React, { useState, useRef, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Pagination } from "antd";
import styles from "./Reyting.module.scss";
// import SwiperCore, { Pagination } from "swiper/core";
import "swiper/css/pagination";
import CustomPagination from "./components/CustomPagination";
import api, { BASE_URL } from "@/utils/api";
import axios from "axios";
import Loader from "@/Components/Loader/Loader";
import ListCard from "@/Components/ListCard";

// SwiperCore.use([Pagination]);

const Reyting = ({ users }) => {
  const [swiper, setSwiper] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState(users.usersData);
  const [pagination, setPagination] = useState(users);
  const [loader, setLoader] = useState(true);

  const [token, setToken] = useState("");

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handlePaginationClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const getDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateTime.toLocaleDateString("en-US", options);
  };

  const getTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { hour: "numeric", minute: "numeric" };
    return dateTime.toLocaleTimeString("en-US", options);
  };

  const onPaginationsChange = async (page, pageSize) => {
    const status = getCookie("status");
    if (token) {
      if (status === "JARAYONDA") {
        let users1 = await axios
          .get(`${BASE_URL}attemptContest/rate/1?page=${page - 1}&size=10`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => res.data);
        setCards(users1.attemptRateDTOS);
      } else {
        let users1 = await axios
          .get(
            `${BASE_URL}regular/getRate?limitSecond=60&page=${
              page - 1
            }&size=10`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => res.data);
        setCards(users1.regularDTOPage);
      }
    } else {
      if (status === "JARAYONDA") {
        let users1 = await axios
          .get(
            `${BASE_URL}attemptContest/rate/notUser/1?page=${page - 1}&size=10`
          )
          .then((res) => res.data);
        setCards(users1.attemptRateDTOS);
      } else {
        let users1 = await axios
          .get(
            `${BASE_URL}attemptContest/rate/notUser/1?page=${page - 1}&size=10`
          )
          .then((res) => res.data);
        setCards(users1.attemptRateDTOS);
      }
    }
  };

  if (typeof window === undefined) return null;

  return (
    <>
      <div className={styles.reyting}>
        <div className="container">
          <div className={styles.reyting__inner}>
            <div className={styles.reyting__top}>
              <h2 className={styles.reyting__title}>Reyting</h2>
              <p className={styles.reyting__timeupdate}>
                Next update in : 6:50
              </p>
            </div>
            {/* {loader && <Loader />} */}
            <Swiper
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<span class="' + className + '">' + (index + 1) + "</span>"
                  );
                },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className={styles.swiper}
              onSwiper={(swiper) => setSwiper(swiper)}
              spaceBetween={50}>
              <div className={styles.reyting__table_top}>
                <div className={styles.reyting__content1}>
                  <span className={styles.reyting__number}>#</span>
                  <p className={styles.reyting__name}>Ism</p>
                </div>
                <div className={styles.reyting__content3}>
                  <p className={styles.reyting__right}>To’g’ri</p>
                  <p className={styles.reyting__wrong}>Xato</p>
                </div>
                <div className={styles.reyting__content2}>
                  <p className={styles.reyting__date}>Sana</p>
                  <p className={styles.reyting__viloyat}>Viloyat</p>
                  <p className={styles.reyting__viloyat}>Batafsil</p>
                </div>
              </div>
              {cards?.content?.map((el, idx) => (
                <ListCard key={idx} data={el} idx={idx} />
              ))}
            </Swiper>
            {/* <CustomPagination
              activeIndex={activeIndex}
              onClick={handlePaginationClick}
              swiper={swiper}
            /> */}
            <div className={styles.pagination_container}>
              <Pagination
                onChange={onPaginationsChange}
                defaultCurrent={1}
                total={cards.totalElements}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reyting;
