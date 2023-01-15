import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostCard.module.css";

const PostCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles["post-card"]}
        onClick={() => navigate(`/${props.data.category}/${props.data._id}`)}
      >
        <img src={props.data.coverPhotoUrl} alt="" />
        <div className={styles.details}>
          <h2>{props.data.title}</h2>
          <p className={styles["last-updated"]}>
            {new Date(props.data.lastUpdated).toLocaleDateString([], {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          {(props.data.category === "blog" ||
            props.data.category === "article") && (
            <p className={styles["category"]}>{props.data.category}</p>
          )}
          <p>{props.data.description}</p>
        </div>
      </div>
    </>
  );
};

export default PostCard;
