import React, { useContext, useState } from "react";
import styles from "./AddEventVolunteerData.module.css";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const AddEventVolunteersData = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [excelFile, setExcelFile] = useState("");

  const authCtx = useContext(AuthContext);

  const onUploadFileSubmitHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("excelFile", excelFile);

    await fetch(`${backendUrl}/addEventVolunteerDataViaExcel`, {
      method: "POST",
      body: formData,
      headers: { Authorization: "Bearer " + authCtx.token },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
        } else if (resData.message) {
          toast.success(resData.message);
        }
      })
      .catch((err) => toast.error(err.message));

    setIsUploading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <form
          className={styles.form}
          onSubmit={onUploadFileSubmitHandler}
          encType="multipart/form-data"
        >
          <label for="excelFile">Upload an Excel file</label>
          <div style={{ marginTop: "1rem" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "900",
                color: "red",
              }}
            >
              File Should contain only six columns and 1st row must have these
              headings in the same manner and same order as well
              <br />
              <br />
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "red",
                }}
              >
                Courses should be only the following -
                <br />
                B.Tech | M.Tech | MBA | MCA
              </span>
              <span style={{ color: "#535353", fontWeight: "500" }}>
                <ul>
                  <li>Name</li>
                  <li>Course</li>
                  <li>
                    Branch (optional - leave this field empty in case of branch
                    other than <strong>B.Tech</strong>)
                  </li>
                  <li>Event (Muskan or Udgam)</li>
                  <li>Roll Number</li>
                  <li>Post Holded</li>
                </ul>
              </span>
            </span>
            <span style={{ color: "#535353", fontWeight: "500" }}>e.g.</span>
            <img
              src="/img/excel-file-tertiary.png"
              alt=""
              className={styles["excel-image"]}
            />
          </div>
          <input
            id="excelFile"
            type="file"
            reqiured
            name="excelFile"
            onChange={(e) => {
              setExcelFile(e.target.files[0]);
            }}
          />
          <button
            type="submit"
            className={styles.submit}
            disabled={isUploading}
          >
            {isUploading ? <div className={styles.loader}></div> : "Upload"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddEventVolunteersData;
