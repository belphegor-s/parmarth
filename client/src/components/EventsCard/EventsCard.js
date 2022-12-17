import React from "react";
import styles from "./EventsCard.module.css";

const EventsCard = (props) => {
  return (
    <div className={styles["events-card"]}>
      <img src={props.src} alt="" className={styles["event-img"]} />
      <div className={styles["event-card__content"]}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default EventsCard;
