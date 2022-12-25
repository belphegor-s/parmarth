import React, { useState } from "react";
import Modal from "../components/Modal/Modal";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ display: "inline" }}>Confirm Delete</div>
        <br />
      </Modal>
    </div>
  );
};

export default Test;
