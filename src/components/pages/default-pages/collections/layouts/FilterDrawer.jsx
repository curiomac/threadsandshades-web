import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import FilterBar from "./FilterBar";

const FilterDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-drawer">
      <div className={`side-drawer ${isOpen ? "open" : ""}`}>
        <div className="links-container-res">
          <div>
          <FilterBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
