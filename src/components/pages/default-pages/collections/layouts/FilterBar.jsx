import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import CustomCheckbox from "../../../../plugins/custom-checkbox/CustomCheckbox";

const FilterBar = () => {
  const [filterGender, setFilterGender] = useState(true);
  const [filterSize, setFilterSize] = useState(true);
  const [filterColor, setFilterColor] = useState(true);
  const [filterPrice, setFilterPrice] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="filter-bar">
      <div className="container-fluid-padding">
        <div className="d-flex align-items-center gap-2 mt-2 mb-2">
          <div>
            <IoFilter className="d-flex align-items-center font-weight-1 filter-icon" />
          </div>
          <div className="font-weight-1 filter-title">Filter</div>
        </div>
        <div className="custom-hr"></div>
        <div className="filter-scroll">
          <div>
            <div
              className="d-flex align-items-center justify-content-space-between cursor-pointer mt-2 mb-2"
              onClick={() => setFilterGender(!filterGender)}
            >
              <div className="filter-heading">Gender</div>
              <div>{filterGender ? <FaMinus /> : <FaPlus />}</div>
            </div>
            {filterGender && (
              <div className="mt-2 mb-2">
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Men</div>
                </CustomCheckbox>
              </div>
            )}
          </div>
          <div className="custom-hr"></div>
          <div>
            <div
              className="d-flex align-items-center justify-content-space-between cursor-pointer mt-2 mb-2"
              onClick={() => setFilterSize(!filterSize)}
            >
              <div className="filter-heading">Size</div>
              <div>{filterSize ? <FaMinus /> : <FaPlus />}</div>
            </div>
            {filterSize && (
              <div className="mt-2 mb-2">
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  {" "}
                  <div className="mt-1 mb-1 filter-value">S</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">M</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">L</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">XL</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">XXL</div>
                </CustomCheckbox>
              </div>
            )}
          </div>
          <div className="custom-hr"></div>
          <div>
            <div
              className="d-flex align-items-center justify-content-space-between cursor-pointer mt-2 mb-2"
              onClick={() => setFilterColor(!filterColor)}
            >
              <div className="filter-heading">Color</div>
              <div>{filterColor ? <FaMinus /> : <FaPlus />}</div>
            </div>
            {filterColor && (
              <div className="mt-2 mb-2">
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  {" "}
                  <div className="mt-1 mb-1 filter-value">Beige</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Blue</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Black</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Red</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Lime</div>
                </CustomCheckbox>
              </div>
            )}
          </div>
          <div className="custom-hr"></div>
          <div>
            <div
              className="d-flex align-items-center justify-content-space-between cursor-pointer mt-2 mb-2"
              onClick={() => setFilterPrice(!filterPrice)}
            >
              <div className="filter-heading">Price</div>
              <div>{filterPrice ? <FaMinus /> : <FaPlus />}</div>
            </div>
            {filterPrice && (
              <div className="mt-2 mb-2">
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">100 - 500</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">500 - 1000</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">1000 - 2000</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">2000 - 3000</div>
                </CustomCheckbox>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
