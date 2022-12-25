import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { IoCloseCircle } from "react-icons/io5";

const Modal = ({ open, children, onClose, onConfirm }) => {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <span className={styles["delete-btn"]}>
          <IoCloseCircle />
        </span>
        {children}
        <div className={styles["options"]}>
          <button className={styles["confirm-btn"]} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles["cancel-btn"]} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default Modal;
