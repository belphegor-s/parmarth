import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostCard.module.css";

const PostCard = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles["post-card"]}
      onClick={() => navigate(`/${props.data.category}/${props.data._id}`)}
    >
      <img src={props.data.coverPhotoUrl} alt="" />
      <div className={styles.details}>
        <h3>{props.data.title}</h3>
        <p>
          {new Date(props.data.lastUpdated).toLocaleDateString([], {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
