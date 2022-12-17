import React from "react";
import styles from "./RteCard.module.css";

const RteCard = (props) => {
  return (
    <div className={styles.card}>
      List of Students admitted in {props.academicYear}
    </div>
  );
};

export default RteCard;
