import React from "react";

const CustomCheckbox = ({ isChecked, toggleCheckbox, children }) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" 
    //   checked={isChecked} 
    //   onChange={toggleCheckbox}
       />
      <span className="checkmark"></span>
      {children}
    </label>
  );
};

export default CustomCheckbox;
