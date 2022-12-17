import React, { useState, useEffect, useContext } from "react";
import styles from "./ListUsers.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const ListUsers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getUsers`, {
        headers: { Authorization: "Bearer " + authCtx.token },
      })
        .then((res) => {
          if (res.status !== 200) {
            return [];
          }
          return res.json();
        })
        .then((res) => {
          if (res === []) {
            toast.error("Failed to load Users");
          }
          setData(res);
        })
        .catch((err) => toast.error(err.messsage));
      setIsLoading(false);
    };
    getUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>List of all Users</h1>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data.length}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr>
                <th>S. No.</th>
                <th>User ID</th>
                <th>User Email</th>
              </tr>
              {isLoading ? (
                <td colspan={3}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res._id}</td>
                    <td>{res.email}</td>
                  </tr>
                ))
              )}
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListUsers;
