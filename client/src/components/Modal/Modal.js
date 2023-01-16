import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ open, children, onClose, onConfirm, isLoading }) => {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        {children}
        <div className={styles["options"]}>
          <button
            className={styles["confirm-btn"]}
            onClick={onConfirm}
            disabled={isLoading}
          >
            Confirm
          </button>
          <button
            className={styles["cancel-btn"]}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default Modal;
