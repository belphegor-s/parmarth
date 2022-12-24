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
      .then((result) => {
        if (result === []) {
          toast.error("Failed to load Users");
        }
        setData(result);
      })
      .catch((err) => toast.error(err.messsage));
    setIsLoading(false);
  };

  useEffect(() => {
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
                <th>2FA Status</th>
              </tr>
              {isLoading ? (
                <td colSpan={4}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res._id}</td>
                    <td>{res.email}</td>
                    <td>
                      {res._id === localStorage.getItem("userId") ? (
                        <button
                          className={
                            res.status2FA
                              ? styles["disable-button"]
                              : styles["enable-button"]
                          }
                          onClick={async () => {
                            await fetch(`${backendUrl}/status2FA`, {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + authCtx.token,
                              },
                              body: JSON.stringify({
                                userId: res._id,
                                status: !res.status2FA,
                              }),
                            })
                              .then((result) => result.json())
                              .then((resData) => {
                                if (resData.error) {
                                  toast.error(resData.error);
                                } else if (resData.message) {
                                  getUsers();
                                  toast.success(resData.message);
                                }
                              })
                              .catch((err) => toast.error(err.messsage));
                          }}
                        >
                          {res.status2FA ? "Disable" : "Enable 2FA"}
                        </button>
                      ) : res.status2FA ? (
                        "Enabled"
                      ) : (
                        "Disabled"
                      )}
                    </td>
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
