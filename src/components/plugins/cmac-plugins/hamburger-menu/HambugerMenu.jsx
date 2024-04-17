import React from "react";
import './HamburgerMenu.css'
const HambugerMenu = ({checked}) => {
  return (
    <div className="hamburger-menu">
      <label for="check">
        <input type="checkbox" id="check" checked={checked} />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
};

export default HambugerMenu;
