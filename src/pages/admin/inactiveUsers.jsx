import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./admin.module.scss"; // Import your module.scss file
import Link from "next/link";

const FalseUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "https://api.yoshdasturchi.uz/api/v1/user/getUserByStatus?status=false&page=0&size=10",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTUwOTYwMTUzIiwiaWF0IjoxNzA4Njc3NjQ4LCJleHAiOjg2NDAwMDE3MDg2Nzc2NDh9.D5jgI2vlpOyVfNJPRMQHiTguRupeBcsefKfa2PIY8fo",
            },
          }
        );
        if (typeof window !== "undefined") {
          sessionStorage.setItem("users", JSON.stringify(res.data.content));
        }
        setUsers(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(
        `https://api.yoshdasturchi.uz/api/v1/user/updateConfirm/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIrOTk4OTUwOTYwMTUzIiwiaWF0IjoxNzA4Njc3NjQ4LCJleHAiOjg2NDAwMDE3MDg2Nzc2NDh9.D5jgI2vlpOyVfNJPRMQHiTguRupeBcsefKfa2PIY8fo",
          },
        }
      );
      // Update the local state to reflect the status change
      setUsers(
        users.map((user) => {
          if (user.id === id) {
            return { ...user, status: !user.status };
          }
          return user;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.data.systemRoleName !== "ROLE_ADMIN") {
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div className={styles["users-container"]}>
      <Link href="/admin">back</Link>
      <table className={styles["users-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Region</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.region}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.status}
                  onChange={() => handleStatusChange(user.id, !user.status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FalseUsers;
