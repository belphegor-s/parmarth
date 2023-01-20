import React, { useContext, useState } from "react";
import styles from "./AddRteData.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const AddRteData = () => {
  const [studentName, setStudentName] = useState("");
  const [classStudying, setClassStudying] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [school, setSchool] = useState("");
  const [excelFile, setExcelFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const authCtx = useContext(AuthContext);

  const isStuddentNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);
  const isClassStudyingValid = (classStudying) =>
    classStudying.trim().length > 0;
  const isSchoolValid = (school) => school.trim().length > 0;
  const isAcademicYearValid = (academicYear) =>
    /\d\d\d\d-\d\d/i.test(academicYear);

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isStuddentNameValid(studentName)) {
      toast.error("Enter a valid name");
      setIsLoading(false);
      return;
    } else if (!isClassStudyingValid(classStudying)) {
      toast.error("Enter Class");
      setIsLoading(false);
      return;
    } else if (!isSchoolValid(school)) {
      toast.error("Enter School Name");
      setIsLoading(false);
      return;
    } else if (!isAcademicYearValid(academicYear)) {
      toast.error("Enter a valid Academic Year");
      setIsLoading(false);
      return;
    }

    const data = {
      studentName: studentName,
      classStudying: classStudying,
      school: school,
      academicYear: academicYear,
    };

    await fetch(`${backendUrl}/addRteData`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
        } else if (resData.message) {
          toast.success(resData.message);
        }
      })
      .catch((err) => console.error(err));

    setIsLoading(false);
  };

  const onUploadFileSubmitHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("excelFile", excelFile);

    await fetch(`${backendUrl}/addRteDataViaExcel`, {
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
              File Should contain only four columns and 1st row must have these
              headings in the same manner and same order.
              <br />
              <span style={{ color: "#535353", fontWeight: "500" }}>
                <ul>
                  <li>Student Name</li>
                  <li>Class Studying</li>
                  <li>School</li>
                  <li>Academic Year</li>
                </ul>
              </span>
            </span>
            <span style={{ color: "#535353", fontWeight: "500" }}>e.g.</span>
            <img
              src="/img/excelData.png"
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
        <h1>OR</h1>
        <form className={styles.form} onSubmit={onFormSubmitHandler}>
          <h1>Add RTE Data</h1>
          <label for="studentName">Student Name</label>
          <input
            required
            id="studentName"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setStudentName(e.target.value)}
          />

          <label for="classStudying">Class</label>
          <input
            required
            id="classStudying"
            type="text"
            placeholder="e.g. Pre Primary/1st/U.K.G."
            onChange={(e) => setClassStudying(e.target.value)}
          />

          <label for="school">School</label>
          <input
            required
            id="school"
            type="text"
            placeholder="Enter school name"
            onChange={(e) => setSchool(e.target.value)}
          />

          <label for="academicYear">
            Academic Year{" "}
            <span style={{ fontSize: "16px", fontWeight: "900", color: "red" }}>
              (Only in YYYY-YY format)
            </span>
          </label>
          <input
            required
            id="academicYear"
            type="text"
            placeholder="e.g. 2016-17"
            onChange={(e) => setAcademicYear(e.target.value)}
          />

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? <div className={styles.loader}></div> : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddRteData;
