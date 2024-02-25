import Head from "next/head";
import { Ads, Keyboard } from "@/Components";
import { Letters, Welcome } from "@/features/home";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "@/DataContext";
import dynamic from "next/dynamic";

export default function Home() {
  const { hiddenInputRef, timer, time, setTime, result, setResult, isKeyboardTrueChecked, isKeyboardFalseChecked } = useContext(DataContext);
  const [hideWelcome, setHideWelcome] = useState(true);
  const [data, setData] = useState([]);
  const [key, setKey] = useState("");
  const [isAdsShow, setIsAdsShow] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state to track game start
  const router = useRouter();
  const [errors, setErrors] = useState(0);
  let playOn = () => new Audio("/sounds/on.mp3").play();
  let playOff = () => new Audio("/sounds/off.mp3").play();

  const handleEnterClick = () => {
    setIsAdsShow(true);
    hiddenInputRef.current.focus();
    setHideWelcome(false);
    setGameStarted(true);
    handleGenerate();
    timer();
    setResult([]);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && hideWelcome && !gameStarted) {
        handleEnterClick();
      } else if (gameStarted) {
        const pressedKey = e.key.toUpperCase();
        const pressedKeyElement = document.querySelector(
          `[data-char="${pressedKey}"]`
        );
        setKey(pressedKey);
        // const foundItem = data[3].letter === pressedKey;
        if (data[3].letter === pressedKey) {
          const newData = [...data];
          newData.pop();

          const alphabet = "ABCDEFGHIJKLMNOPRSTUVWYZ";
          const randomIndex = Math.floor(Math.random() * alphabet.length);
          const randomLetter = alphabet[randomIndex];
          newData.unshift({
            letter: randomLetter,
            position: {
              x: Math.floor(Math.random() * 90),
              y: Math.floor(Math.random() * 90),
            },
          });
          setData(newData);
          setKey("");
          pressedKeyElement.classList.add("active");
          setTimeout(() => {
            pressedKeyElement.classList.remove("active");
          }, 200);
          setResult((prev) => [...prev, 1]);
          if (isKeyboardTrueChecked) playOn();
        } else {
          if (pressedKeyElement) {
            pressedKeyElement.classList.add("inActive");
            setTimeout(() => {
              pressedKeyElement.classList.remove("inActive");
            }, 200);
          } else {
            return false;
          }
          setErrors((prev) => prev + 1);
          if (errors >= 20) {
            alert('Sizning xatolaringiz 20 tadan oshib ketdi.');
            router.reload();
          }
          setResult((prev) => [...prev, 0]);
          if (isKeyboardFalseChecked) playOff();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  });

  const handleGenerate = () => {
    const generateRandomData = () => {
      const alphabet = "ABCDEFGHIJKLMNOPRSTUVWYZ";
      const newData = Array.from({ length: 4 }, () => {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const randomLetter = alphabet[randomIndex];
        return {
          letter: randomLetter,
          position: {
            x: Math.floor(Math.random() * 90),
            y: Math.floor(Math.random() * 90),
          },
        };
      });
      setData(newData);
    };

    generateRandomData();
  };

  useEffect(() => {
    if (time === 0) {
      router.push('/result');
    }
  }, [router, time]);

  const ContestDate = dynamic(() => import('../Components/ContestDate'))

  return (
    <>
      <main>
        <Ads isAdsShow={isAdsShow} isRight={true} />
        <div className="container">
          {hideWelcome ? (
            <Welcome handleEnterClick={handleEnterClick} />
          ) : (
            <Letters data={data}
            />
          )}
          <Keyboard
            letter={data[3]}
            setKey={setKey}
            handleGenerate={handleGenerate}
            randomLetters={data.map((item) => item.letter)}
          />
        </div>
        <div className="ads_and_contest">
          <Ads isAdsShow={isAdsShow} isRight={false} />
          <ContestDate isAdsShow={isAdsShow} isHaveNavbar={false} />
        </div>
      </main>
    </>
  );
}
