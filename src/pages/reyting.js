/** @format */

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Reyting } from "@/features";
import axios from "axios";
import { BASE_URL } from "@/utils/api";

const reyting = (props) => {
  return (
    <>
      <Reyting users={props.users} />
    </>
  );
};

export default reyting;
export async function getServerSideProps({ req, res }) {
  console.log("req", req.cookies["token"]);
  let users = { place: null, usersData: [] };
  if (req.cookies["token"]) {
    if (req.cookies["status"] === "JARAYONDA") {
      let users1 = await axios
        .get(`${BASE_URL}attemptContest/rate/1?page=0&size=10`, {
          headers: {
            Authorization: `Bearer ${req.cookies["token"]}`
          }
        })
        .then((res) => res.data);

      users = { ...users, usersData: users1.attemptRateDTOS.content }
    } else {
      let users1 = await axios
        .get(`${BASE_URL}regular/getRate?limitSecond=60&page=0&size=10`, {
          headers: {
            Authorization: `Bearer ${req.cookies["token"]}`
          }
        })
        .then((res) => res.data);

      users = { ...users, usersData: users1.regularDTOPage.content }
    }

  } else {
    if (req.cookies["status"] === "JARAYONDA") {
      let users1 = await axios
        .get(`${BASE_URL}attemptContest/rate/notUser/1?page=0&size=10`)
        .then((res) => res.data);

      users = { ...users, usersData: users1.attemptRateDTOS.content }
    } else {
      let users1 = await axios
        .get(`${BASE_URL}regular/getRateNotUser?limitSecond=60&page=0&size=10`)
        .then((res) => res.data);

      users = { ...users, usersData: users1.regularDTOPage.content }
    }
  }
  return {
    props: { users },
  };
}

