import React, { useEffect, useState } from "react";
import styles from "./Letters.module.scss";
import Timer from "@/Components/Timer";

const Letters = ({ data }) => {
  const [isLetterTrue, setIsLetterTrue] = useState(true);
  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toUpperCase();
      if (pressedKey == data[3].letter) {
        setIsLetterTrue(true);
      } else {
        setIsLetterTrue(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [data]);

  return (
    <>
      {/* <Timer nav={false} /> */}
      <div className={styles.letter_sec}>
        <div className={styles.letter_inner}>
          {data.map((item, idx) => (
            <div
              key={idx}
              className={idx == 3 ? styles.letterActive : styles.letter}
              style={{ paddingLeft: item.position.x + "%" }}>
              <span
                className={`${styles.trueLetter}
                  ${isLetterTrue ? "" : styles.falseLetter}`}>
                {item.letter}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Letters;
