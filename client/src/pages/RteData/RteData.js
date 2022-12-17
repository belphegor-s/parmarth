import React, { useEffect, useState } from "react";
import styles from "./RteData.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import backendUrl from "../../backendUrl";

const RteData = () => {
  const [data, setData] = useState([]);
  const { academicYear } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRteDataByAcademicYear = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getRteData/` + academicYear)
        .then((res) => {
          if (res.status !== 200) {
            return [];
          }
          return res.json();
        })
        .then((res) => {
          if (res === []) {
            toast.error("Failed to load Student Data");
          }
          setData(res);
        })
        .catch((err) => toast.error(err.messsage));
      setIsLoading(false);
    };
    getRteDataByAcademicYear();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>RTE Admission Data of Year {academicYear}</h1>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data.length}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr>
                <th>S. No.</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>School</th>
              </tr>
              {isLoading ? (
                <td colspan={4}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res.studentName}</td>
                    <td>{res.classStudying}</td>
                    <td>{res.school}</td>
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

export default RteData;
