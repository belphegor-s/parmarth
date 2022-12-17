import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["not-found"]}>
      <div className={styles["error-code"]}>404</div>
      <div className={styles["error-message"]}>
        Uh-oh! The page you are looking for does not exist
      </div>
      <div className={styles["home-page-link"]} onClick={() => navigate("/")}>
        Click here to home page
      </div>
    </div>
  );
};

export default NotFound;
