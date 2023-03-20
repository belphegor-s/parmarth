import React, { useContext, useState } from "react";
import styles from "./AddVolunteerData.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const AddVolunteerData = () => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState(0);
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [postHolded, setPostHolded] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [excelFile, setExcelFile] = useState("");
  const authCtx = useContext(AuthContext);

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  const isRollNumberValid = (rollNumber) => rollNumber.length === 13;

  const isCourseValid = (course) => {
    switch (course) {
      case "B.Tech":
      case "M.Tech":
      case "MBA":
      case "MCA":
        return true;

      default:
        return false;
    }
  };

  const isPostHoldedValid = (postHolded) =>
    typeof postHolded === "string" && postHolded.trim().length > 0;

  const onFormSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isNameValid(name)) {
      toast.error("Enter a valid name");
      setIsLoading(false);
      return;
    } else if (!isRollNumberValid(rollNumber)) {
      toast.error("Enter a valid roll number");
      setIsLoading(false);
      return;
    } else if (!isCourseValid(course)) {
      toast.error("Select a course");
      setIsLoading(false);
      return;
    } else if (!isPostHoldedValid(postHolded)) {
      toast.error("Enter your Post");
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      rollNumber: +rollNumber,
      course: course,
      postHolded: postHolded,
      ...(course === "B.Tech" && { branch: branch }),
    };

    fetch(`${backendUrl}/addVolunteerData`, {
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

    await fetch(`${backendUrl}/addVolunteerDataViaExcel`, {
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
              File Should contain only five columns and 1st row must have these
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
                  <li>Roll Number</li>
                  <li>Post Holded</li>
                </ul>
              </span>
            </span>
            <span style={{ color: "#535353", fontWeight: "500" }}>e.g.</span>
            <img
              src="/img/excel-file-secondary.png"
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
          <h1>Add Volunteer Data</h1>
          <label for="name">Name</label>
          <input
            required
            id="name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
          <label for="roll-number">Roll Number</label>
          <input
            required
            id="roll-number"
            type="text"
            placeholder="Enter your roll number"
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <label for="course">Course</label>
          <select
            required
            id="course"
            defaultValue="choose"
            className={styles["branch-dropdown"]}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option disabled hidden value="choose">
              Select Branch
            </option>
            <option value="B.Tech">B.Tech.</option>
            <option value="M.Tech">M.Tech.</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>
          {course === "B.Tech" && (
            <>
              <label for="branch">Branch</label>
              <select
                required
                id="branch"
                defaultValue="choose"
                className={styles["branch-dropdown"]}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option disabled hidden value="choose">
                  Select Branch
                </option>
                <option value="CE">CE - Civil Engineering</option>
                <option value="CH">CH - Chemical Engineering</option>
                <option value="CS">CS - Computer Science Engineering</option>
                <option value="EC">
                  EC - Electronics and Communication Engineering
                </option>
                <option value="EE">EE - Electrical Engineering</option>
                <option value="EI">
                  EI - Electronics and Instrumentation Engineering
                </option>
                <option value="IT">IT - Information Technology</option>
                <option value="ME">ME - Mechanical Engineering</option>
              </select>
            </>
          )}
          <label for="post-holded">Post Holded</label>
          <input
            required
            id="post-holded"
            type="text"
            placeholder="e.g. Volunteer"
            onChange={(e) => setPostHolded(e.target.value)}
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

export default AddVolunteerData;
