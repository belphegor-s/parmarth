import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./EducationalVisits.module.css";

const EducationalVisits = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}></div>
      <Footer />
    </>
  );
};

export default EducationalVisits;
