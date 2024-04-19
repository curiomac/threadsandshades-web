import React from "react";

const CustomCheckbox = ({ isChecked, toggleCheckbox, children, onClick }) => {
  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
        onClick={onClick}
      />
      {children}
    </div>
  );
};

export default CustomCheckbox;
