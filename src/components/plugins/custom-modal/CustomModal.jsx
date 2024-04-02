import React from "react";

const CustomModal = ({ isOpen, onClose, size, children }) => {
  const getModalSize = () => {
    switch (size) {
      case "XL": {
        return "1200px";
      }
      case "L": {
        return "992px";
      }
      case "M": {
        return "768px";
      }
      case "S": {
        return "576px";
      }
      default: {
        return "400px";
      }
    }
  };
  // if (!isOpen) {
  //   return null;
  // }
  return (
    <div className={`custom-modal ${isOpen ? "open" : "close"}`}>
      <div
        className={`modal-content ${isOpen ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ width: getModalSize() }}
      >
        {isOpen && <div>{children}</div>}
      </div>
    </div>
  );
};

export default CustomModal;
