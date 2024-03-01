import React from "react";

const CustomCheckbox = ({ isChecked, toggleCheckbox, children, onClick }) => {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
        onClick={onClick}
      />
      <span className="checkmark"></span>
      {children}
    </label>
  );
};

export default CustomCheckbox;
