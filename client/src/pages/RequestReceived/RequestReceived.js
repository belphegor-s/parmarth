import React, { useContext, useEffect, useState } from "react";
import styles from "./RequestReceived.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AuthContext from "../../store/auth-context";
import toast from "react-hot-toast";
import { ImCross, ImCheckmark } from "react-icons/im";
import backendUrl from "../../backendUrl";

const RequestReceived = () => {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [purpose, setPurpose] = useState("general");

  const getRequestData = async (purposeValue) => {
    setIsLoading(true);

    await fetch(`${backendUrl}/getRequestData`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purpose: purposeValue || "general" }),
    })
      .then((res) => {
        if (res.status !== 200) {
          return [];
        }
        return res.json();
      })
      .then((res) => {
        if (res === []) {
          toast.error("Failed to load Requests Received");
        }
        setData(res);
      })
      .catch((err) => toast.error(err.message));

    setIsLoading(false);
  };

  useEffect(() => {
    getRequestData(purpose);
  }, [purpose]);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles["tabs-btn"]}>
          <h4>Purpose Category</h4>
          <button
            onClick={() => {
              setPurpose("general");
            }}
            className={purpose === "general" && styles["tab-active"]}
          >
            General
          </button>
          <button
            onClick={() => {
              setPurpose("event");
            }}
            className={purpose === "event" && styles["tab-active"]}
          >
            Event
          </button>
        </div>
        <div>
          <div className={styles.total}>
            <strong>Total Requests Received:</strong> {data.length}
          </div>
          {isApproveLoading && <div className={styles["loader-approve"]}></div>}
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Purpose</th>
                <th>Data Exist</th>
                <th>Approve Request</th>
                <th>Reject Request</th>
              </tr>
              {isLoading ? (
                <td colspan={9}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res.name}</td>
                    <td>{res.branch}</td>
                    <td>{res.rollNumber}</td>
                    <td>{res.email}</td>
                    <td>
                      {res.purpose === "general" ? (
                        <span>
                          <strong>
                            {res.purpose.toUpperCase()}
                            <br />
                            POST:{" "}
                          </strong>
                          {res.postHolded}
                        </span>
                      ) : (
                        <span>
                          <strong>{res.purpose.toUpperCase()} - </strong>
                          {res.event.toUpperCase()}
                        </span>
                      )}
                    </td>
                    <td>
                      {res.dataExist ? (
                        <ImCheckmark color="#38E54D" size={20} />
                      ) : (
                        <ImCross color="#DC3535" />
                      )}
                    </td>
                    <td>
                      <button
                        className={styles.button}
                        style={{ backgroundColor: "#82cd47" }}
                        onClick={async () => {
                          setIsApproveLoading(true);
                          await fetch(
                            `${backendUrl}/approveRequest/` + res._id,
                            {
                              headers: {
                                Authorization: "Bearer " + authCtx.token,
                              },
                              method: "POST",
                            },
                          )
                            .then((res) => res.json())
                            .then(async (resData) => {
                              if (resData.error) {
                                toast.error(resData.error);
                              } else if (resData.message) {
                                toast.success(resData.message);

                                await fetch(
                                  `${backendUrl}/deleteRequestData/` + res._id,
                                  {
                                    headers: {
                                      Authorization: "Bearer " + authCtx.token,
                                    },
                                    method: "DELETE",
                                  },
                                )
                                  .then((res) => res.json())
                                  .then((resData) => {
                                    if (resData.error) {
                                      toast.error(resData.error);
                                    } else if (resData.message) {
                                      setData(
                                        data.filter(
                                          (data) => data._id !== res._id,
                                        ),
                                      );
                                      console.log(resData.message);
                                    }
                                  })
                                  .catch((err) => console.log(err));
                              }
                            })
                            .catch((err) => console.log(err));
                          setIsApproveLoading(false);
                        }}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.button}
                        style={{ backgroundColor: "#ff6464" }}
                        onClick={async () => {
                          await fetch(
                            `${backendUrl}/deleteRequestData/` + res._id,
                            {
                              headers: {
                                Authorization: "Bearer " + authCtx.token,
                              },
                              method: "DELETE",
                            },
                          )
                            .then((res) => res.json())
                            .then((resData) => {
                              if (resData.error) {
                                toast.error(resData.error);
                              } else if (resData.message) {
                                setData(
                                  data.filter((data) => data._id !== res._id),
                                );
                                toast.success(resData.message);
                              }
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Reject
                      </button>
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

export default RequestReceived;
