import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import CustomCheckbox from "../../../../plugins/custom-checkbox/CustomCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../../redux/actions/productsAction";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";

const FilterBar = () => {
  const type = getQueryParam("type");
  const [filterGender, setFilterGender] = useState(true);
  const [filterSize, setFilterSize] = useState(true);
  const [filterColor, setFilterColor] = useState(true);
  const [filterPrice, setFilterPrice] = useState(true);
  const [filterSizes, setFilterSizes] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const availableSizes = ["S", "M", "L", "XL", "XXL"];
  const [available_colors, setAvailableColors] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const { filters_applied, filters_available } = useSelector(
    (state) => state.productsState
  );
  const handleSizeFilter = (e) => {
    let filter_sizes = [];
    if (filterSizes?.some((size) => size === e)) {
      filter_sizes = filterSizes.filter((size) => size !== e);
      setFilterSizes(filter_sizes);
    } else {
      filter_sizes = [...filterSizes, e];
      setFilterSizes(filter_sizes);
    }
    dispatch(getProducts(filter_sizes, filterColors));
  };
  const handleColorFilter = (e) => {
    let filter_colors = [];
    if (filterColors?.some((size) => size === e)) {
      filter_colors = filterColors.filter((size) => size !== e);
      setFilterColors(filter_colors);
    } else {
      filter_colors = [...filterColors, e];
      setFilterColors(filter_colors);
    }
    dispatch(getProducts(filterSizes, filter_colors));
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (filters_applied) {
      const formated_filter_size_array =
        filters_applied.available_sizes?.split(",") || [];
      console.log("formated_filter_size_array: ", formated_filter_size_array);
      setFilterSizes(formated_filter_size_array);

      const formated_filter_color_array =
        filters_applied.target_color?.split(",") || [];
      console.log("formated_filter_color_array: ", formated_filter_color_array);
      setFilterColors(formated_filter_color_array);

      dispatch(getProducts(formated_filter_size_array, formated_filter_color_array));
    } else {
      dispatch(getProducts([], []));
    }
  }, []);
  useEffect(() => {
    if (filters_available) {
      const formated_array = filters_available?.map((data) => {
        return data.target_color;
      });

      formated_array.sort((a, b) => a.localeCompare(b));

      setAvailableColors(formated_array);
      console.log("formated_array: ", formated_array);
    }
  }, [filters_available]);
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
                  isChecked={type ? true : false}
                  // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">{type}</div>
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
                {availableSizes.map((size) => {
                  const getAppliedSizes = () => {
                    if (
                      filterSizes?.some(
                        (filterSizeValue) => filterSizeValue === size
                      )
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  };
                  return (
                    <CustomCheckbox
                      isChecked={getAppliedSizes()}
                      toggleCheckbox={toggleCheckbox}
                      onClick={() => handleSizeFilter(size)}
                    >
                      {" "}
                      <div className="mt-1 mb-1 filter-value">{size}</div>
                    </CustomCheckbox>
                  );
                })}
                {/* <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                  onClick={() => handleSizeFilter("M")}
                >
                  <div className="mt-1 mb-1 filter-value">M</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                  onClick={() => handleSizeFilter("L")}
                >
                  <div className="mt-1 mb-1 filter-value">L</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                  onClick={() => handleSizeFilter("XL")}
                >
                  <div className="mt-1 mb-1 filter-value">XL</div>
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={isChecked}
                  toggleCheckbox={toggleCheckbox}
                  onClick={() => handleSizeFilter("XXL")}
                >
                  <div className="mt-1 mb-1 filter-value">XXL</div>
                </CustomCheckbox> */}
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
                {available_colors?.map((available_color) => {
                  const getAppliedColors = () => {
                    if (
                      filterColors?.some(
                        (filterColorValue) =>
                          filterColorValue === available_color
                      )
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  };
                  return (
                    <CustomCheckbox
                      isChecked={getAppliedColors()}
                      toggleCheckbox={toggleCheckbox}
                      onClick={() => handleColorFilter(available_color)}
                    >
                      {" "}
                      <div className="mt-1 mb-1 filter-value">
                        {available_color}
                      </div>
                    </CustomCheckbox>
                  );
                })}

                {/* <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Blue</div>
                </CustomCheckbox>
                <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Black</div>
                </CustomCheckbox>
                <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Red</div>
                </CustomCheckbox>
                <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">Lime</div>
                </CustomCheckbox> */}
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
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">100 - 500</div>
                </CustomCheckbox>
                <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">500 - 1000</div>
                </CustomCheckbox>
                <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">1000 - 2000</div>
                </CustomCheckbox>
                <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
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
