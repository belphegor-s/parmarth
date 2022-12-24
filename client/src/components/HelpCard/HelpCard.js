import React from "react";
import styles from "./HelpCard.module.css";

const HelpCard = (props) => {
  return (
    <div className={styles.card}>
      <img src={props.src} alt="" style={{ width: "200px", height: "200px" }} />
      <h2 className={styles.title}>{props.title}</h2>
      <hr
        style={{
          border: "2px solid #277bc0",
          borderCollapse: "collapse",
          borderBottom: "none",
          width: "50px",
          borderRadius: "10px",
        }}
      />
      <p>{props.description}</p>
    </div>
  );
};

export default HelpCard;
