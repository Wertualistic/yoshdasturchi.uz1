import React, { useEffect, useState } from "react";
import styles from "./Results.module.scss";
import Image from "next/image";
import api from "@/utils/api";
import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/router";

const Results = ({ id }) => {
  const router = useRouter();
  const [userResult, setUserResult] = useState(null);
  const [loader, setLoader] = useState(true);

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData")) || [];
    const lastContest = JSON.parse(sessionStorage.getItem("lastContest")) || [];
    const status = getCookie("status");
    const fetchUserData = async () => {
      try {
        setLoader(true);
        if (status === "JARAYONDA") {
          const res = await api.get(
            `attemptContest/getAllAttemptByUserAndContestId/${
              id ? id : userData.id
            }/${lastContest.id}?page=0&size=500`
          );
          sessionStorage.setItem("userResult", JSON.stringify(res.data));
          setUserResult(res.data);
          setLoader(false);
        } else {
          const res = await api.get(
            `/regular/getRegularByUserId/${
              id ? id : userData.id
            }?page=0&size=500`
          );
          sessionStorage.setItem("userResult", JSON.stringify(res.data));
          setUserResult(res.data);
          setLoader(false);
        }
      } catch (err) {
        return false;
      }
    };

    fetchUserData();
  }, []);

  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.Result}>
      <div className="container">
        <div className={styles.ResultBack} onClick={goBack}>
          <i className="ri-arrow-left-line"></i>
          <p>Orqaga</p>
        </div>
        {userResult && (
          <>
            <div className={styles.ResultsAll}>
              {loader && <Loader />}
              <div className={styles.ResultsContainer}>
                <div className={styles.ResultCard}></div>
                <div className={styles.ResultTest}>
                  <div className={styles.FinishedTest}>
                    <p>Tugatilgan Testlar</p>
                    <h1>{userResult.totalElements}</h1>
                  </div>
                  <div className={styles.FinishedTime}>
                    <p>Umumiy yozish vaqti</p>
                    <h1>{userResult.totalElements} minut</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.AllResultsList}>
              <div className={styles.AllResultsContainer}>
                <table>
                  <thead>
                    <tr>
                      <td>{`To\'g\'ri`}</td>
                      <td>{`Noto\'g\'ri`}</td>
                      <td>Vaqt</td>
                      <td>Sana</td>
                    </tr>
                  </thead>
                  <tbody>
                    {userResult.content.map((result, idx) => (
                      <tr key={idx}>
                        <td>{result.trueLetterCount}</td>
                        <td>{result.falseLetterCount}</td>
                        <td>60</td>
                        <td>{new Date(result.endAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
