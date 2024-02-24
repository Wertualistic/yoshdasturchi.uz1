import React, { useState, useRef, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./Reyting.module.scss";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/css/pagination";
import CustomPagination from "./components/CustomPagination";
import api from "@/utils/api";

SwiperCore.use([Pagination]);

const Reyting = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);

  const handlePaginationClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  // useEffect(() => {
  //   if (swiper) {
  //     updateSlidesHeight();
  //   }
  // }, [swiper]);

  useEffect(() => {
    const token = getCookie("token");
    const lastContest = JSON.parse(sessionStorage.getItem("lastContest"));
    if (token != null) {
      const fetchRating = async () => {
        try {
          const response = await api.get(
            lastContest.status === "JARAYONDA"
              ? "/attemptContest/rate/1?page=0&size=100"
              : "/regular/getRate?limitSecond=60&page=0&size=100"
          );
          if (
            Array.isArray(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            )
          ) {
            setCards(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            );
          }
        } catch (error) {
          if (error.response?.status == 401) {
            handleLogout();
          }
        }
      };

      fetchRating();
    } else {
      const fetchRating = async () => {
        try {
          const response = await axios.get(
            lastContest.status === "JARAYONDA"
              ? "https://api.yoshdasturchi.uz/api/v1/attemptContest/rate/notUser/1?page=0&size=100"
              : "https://api.yoshdasturchi.uz/api/v1/regular/getRateNotUser?limitSecond=60&page=0&size=100"
          );
          if (
            Array.isArray(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            )
          ) {
            setCards(
              lastContest.status === "JARAYONDA"
                ? response.data.attemptRateDTOS.content
                : response.data.regularDTOPage.content
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchRating();
    }
  }, []);

  // function updateSlidesHeight() {
  //   const swiperWrapper = document.querySelector('.swiper-wrapper');
  //   let maxHeight = 0;

  //   swiperWrapper.childNodes.forEach(node => {
  //     if (node.offsetHeight > maxHeight) {
  //       maxHeight = node.offsetHeight;
  //     }
  //   });

  //   swiperWrapper.style.height = maxHeight + 'px';
  // }

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
              {cards.reduce((acc, outerCard, index) => {
                if (index % 10 === 0) {
                  acc.push(
                    <SwiperSlide key={`slide-${index / 10}`}>
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
                        </div>
                      </div>
                      <div className={styles.reyting__table}>
                        {cards
                          .slice(index, index + 10)
                          .map((innerCard, idx) => (
                            <div
                              key={index + idx}
                              className={`${styles.reyting__userreyt} ${
                                idx % 2 === 0 ? styles.active : ""
                              }`}>
                              <div className={styles.reyting__content1}>
                                <span className={styles.reyting__number}>
                                  {index + idx + 1}
                                </span>
                                <p className={styles.reyting__profile}>
                                  <div
                                    className={
                                      styles.reyting__profileimage
                                    }></div>
                                  {innerCard.user.name}
                                </p>
                              </div>
                              <div className={styles.reyting__content3}>
                                <p className={styles.reyting__rightuser}>
                                  {innerCard.trueLetterCount}
                                </p>
                                <p className={styles.reyting__wronguser}>
                                  {innerCard.falseLetterCount}
                                </p>
                              </div>
                              <div className={styles.reyting__content2}>
                                <p className={styles.reyting__dateuser}>
                                  {getDate(innerCard.startAt)}
                                  <span>{getTime(innerCard.startAt)}</span>
                                </p>
                                <p className={styles.reyting__viloyatuser}>
                                  {innerCard.user.region}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </SwiperSlide>
                  );
                }
                return acc;
              }, [])}
            </Swiper>
            <CustomPagination
              activeIndex={activeIndex}
              onClick={handlePaginationClick}
              swiper={swiper}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reyting;
