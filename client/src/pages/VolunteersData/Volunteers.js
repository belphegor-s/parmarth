import React, { useContext, useEffect, useState } from "react";
import styles from "./Volunteers.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const Volunteers = () => {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVolunteersData = async () => {
      setIsLoading(true);

      await fetch(`${backendUrl}/getVolunteersData`, {
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
            toast.error("Failed to load Volunteers Data");
          }
          setData(res);
        })
        .catch((err) => console.log(err));

      setIsLoading(false);
    };
    getVolunteersData();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data.length}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Course (Branch)</th>
                <th>Roll Number</th>
                <th>Post Holded</th>
              </tr>
              {isLoading ? (
                <td colspan={5}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res.name}</td>
                    <td>
                      {res.course} {res?.branch && <span>({res?.branch})</span>}
                    </td>
                    <td>{res.rollNumber}</td>
                    <td>{res.postHolded}</td>
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

export default Volunteers;
