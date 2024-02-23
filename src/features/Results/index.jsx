import React, { useEffect, useState } from "react";
import styles from "./Results.module.scss";
import Image from "next/image";
import api from "@/utils/api";

const Results = () => {
  const [userResult, setUserResult] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/regular/getRegularByPage?page=0&size=10");
        sessionStorage.setItem("userResult", JSON.stringify(res.data));
        setUserResult(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  console.log(userResult);

  return (
    <div className={styles.Result}>
      <div className="container">
        <div
          className={styles.ResultBack}
          onClick={() => (window.location.href = "/")}>
          <i className="ri-arrow-left-line"></i>
          <p>Orqaga</p>
        </div>
        {userResult && (
          <>
            <div className={styles.ResultsAll}>
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
                        <td>{result.limitSecondRegular}</td>
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
