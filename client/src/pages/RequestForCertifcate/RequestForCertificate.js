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
  const [branch, setBranch] = useState("");
  const [postHolded, setPostHolded] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isRollNumberValid = (rollNumber) => rollNumber.length === 13;

  const isBranchValid = (branch) => {
    switch (branch) {
      case "CE":
      case "CH":
      case "CS":
      case "EC":
      case "EE":
      case "EI":
      case "IT":
      case "ME":
        return true;

      default:
        return false;
    }
  };

  const isPostHoldedValid = (postHolded) =>
    typeof postHolded === "string" && postHolded.trim().length > 0;

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
    } else if (!isBranchValid(branch)) {
      toast.error("Select a branch");
      setIsLoading(false);
      return;
    } else if (!isPostHoldedValid(postHolded)) {
      toast.error("Enter your Post");
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      email: email,
      rollNumber: +rollNumber,
      branch: branch,
      postHolded: postHolded,
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
          <label for="post-holded">Post Holded</label>
          <input
            required
            id="post-holded"
            type="text"
            placeholder="e.g. Volunteer"
            onChange={(e) => setPostHolded(e.target.value)}
          />

          <button type="submit" className={styles.submit}>
            {isLoading ? <div className={styles.loader}></div> : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RequestForCertificate;
