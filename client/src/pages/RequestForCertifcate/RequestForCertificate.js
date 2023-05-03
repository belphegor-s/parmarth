import React, { useState } from "react";
import styles from "./RequestForCertificate.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import backendUrl from "../../backendUrl";

const RequestForCertificate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState(0);
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [postHolded, setPostHolded] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [event, setEvent] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

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

  const isAcademicYearValid = (academicYear) => /\d\d\d\d/.test(academicYear);

  const isEventValid = (event) => {
    switch (event) {
      case "muskan":
      case "udgam":
        return true;
      default:
        return false;
    }
  };

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isNameValid(name)) {
      toast.error("Enter a valid name");
      setIsLoading(false);
      return;
    } else if (!isEmailValid(email)) {
      toast.error("Enter a valid email");
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
    }

    if (purpose === "general") {
      if (!isPostHoldedValid(postHolded)) {
        toast.error("Enter your Post");
        setIsLoading(false);
        return;
      }
    } else if (purpose === "event") {
      if (!isEventValid(event)) {
        toast.error("Select a valid Event");
        setIsLoading(false);
        return;
      }
      if (!isAcademicYearValid(academicYear)) {
        toast.error("Enter a valid Academic Year");
        setIsLoading(false);
        return;
      }
    }

    const data = {
      name: name,
      email: email,
      rollNumber: +rollNumber,
      course: course,
      purpose: purpose,
      academicYear: academicYear,
      ...(course === "B.Tech" && { branch: branch }),
      ...(purpose === "general" && { postHolded: postHolded }),
      ...(purpose === "event" && { event: event }),
    };

    await fetch(`${backendUrl}/addRequestData`, {
      method: "POST",
      headers: {
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

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <form className={styles.form} onSubmit={onFormSubmitHandler}>
          <h1>Request for Certificate</h1>
          <label for="name">Name</label>
          <input
            required
            id="name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
          <label for="email">Email</label>
          <input
            required
            id="email"
            type="email"
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
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
            className={styles.dropdown}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option disabled hidden value="choose">
              Select Branch
            </option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
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
                className={styles.dropdown}
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
          <label for="purpose">Select Purpose</label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "2rem",
            }}
          >
            <button
              className={`${styles.btn} ${
                purpose === "general" ? styles["btn-active"] : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPurpose("general");
              }}
            >
              General
            </button>
            <button
              className={`${styles.btn} ${
                purpose === "event" ? styles["btn-active"] : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPurpose("event");
              }}
            >
              Event
            </button>
          </div>
          {purpose === "general" && (
            <>
              <label for="post-holded">Post Holded</label>
              <input
                required
                id="post-holded"
                type="text"
                placeholder="e.g. Volunteer"
                onChange={(e) => setPostHolded(e.target.value)}
              />
            </>
          )}
          {purpose === "event" && (
            <>
              <label for="event-selection">Select Event</label>
              <select
                required
                id="event-selection"
                defaultValue="choose"
                className={styles.dropdown}
                onChange={(e) => setEvent(e.target.value)}
              >
                <option disabled hidden value="choose">
                  Select Event
                </option>
                <option value="muskan">Muskan</option>
                <option value="udgam">Udgam</option>
              </select>
              <label for="academic-year">Academic Year</label>
              <input
                type="text"
                placeholder="e.g. 2022"
                onChange={(e) => setAcademicYear(e.target.value)}
              />
            </>
          )}

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? <div className={styles.loader}></div> : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RequestForCertificate;
