import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import CustomCheckbox from "../../../../plugins/custom-checkbox/CustomCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../../redux/actions/productsAction";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { getScreenResolution } from "../../../../../helpers/screen-resolution/getScreenResolution";

const FilterBar = ({ toggle, resBar }) => {
  const type = getQueryParam("type");
  const search_input = getQueryParam("input");
  const [filterGender, setFilterGender] = useState(true);
  const [filterSize, setFilterSize] = useState(true);
  const [filterColor, setFilterColor] = useState(true);
  const [filterPrice, setFilterPrice] = useState(true);
  const [filterGenders, setFilterGenders] = useState([]);
  const [filterSizes, setFilterSizes] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const availableGenders = ["Male", "Female"];
  const availableSizes = ["S", "M", "L", "XL", "XXL"];
  const [available_colors, setAvailableColors] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const { filters_applied, filters_available } = useSelector(
    (state) => state.productsState
  );
  const handleGenderFilter = (e) => {
    let filter_genders = [];
    if (filterGenders?.some((size) => size === e)) {
      filter_genders = filterGenders.filter((size) => size !== e);
      setFilterGenders(filter_genders);
    } else {
      filter_genders = [...filterGenders, e];
      setFilterGenders(filter_genders);
    }
    getScreenResolution().then((res) => {
      if (res.width >= 897) {
        if (search_input) {
          dispatch(
            getProducts(search_input.split(" "), filter_genders, filterColors)
          );
        } else {
          dispatch(getProducts([], filter_genders, filterColors));
        }
      }
    });
  };
  const handleSizeFilter = (e) => {
    let filter_sizes = [];
    if (filterSizes?.some((size) => size === e)) {
      filter_sizes = filterSizes.filter((size) => size !== e);
      setFilterSizes(filter_sizes);
    } else {
      filter_sizes = [...filterSizes, e];
      setFilterSizes(filter_sizes);
    }
    getScreenResolution().then((res) => {
      if (res.width >= 897) {
        if (search_input) {
          dispatch(
            getProducts(search_input.split(" "), filter_sizes, filterColors)
          );
        } else {
          dispatch(getProducts([], filter_sizes, filterColors));
        }
      }
    });
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
    getScreenResolution().then((res) => {
      if (res.width >= 897) {
        if (search_input) {
          dispatch(
            getProducts(search_input.split(" "), filterSizes, filter_colors)
          );
        } else {
          dispatch(getProducts([], filterSizes, filter_colors));
        }
      }
    });
  };
  const handleApplyFilter = () => {
    toggle(false);
    dispatch(getProducts([], filterSizes, filterColors));
  };
  const handleClearFilter = () => {
    setFilterGenders([]);
    setFilterSizes([]);
    setFilterColors([]);
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (type) {
      const getType = () => {
        if (type === "men") return "Male";
        else if (type === "women") {
          return "Female";
        } else {
          return "";
        }
      };
      console.log("DFDFDF", getType());
      setFilterGenders([...filterGenders, getType()]);
    }
  }, [type]);
  useEffect(() => {
    if (filters_applied) {
      if (resBar) {
        const formated_filter_size_array =
          filters_applied.available_sizes?.split(",") || [];
        console.log("formated_filter_size_array: ", formated_filter_size_array);
        setFilterSizes(formated_filter_size_array);

        const formated_filter_color_array =
          filters_applied.target_color_code?.split(",") || [];
        console.log(
          "formated_filter_color_array: ",
          formated_filter_color_array
        );
        setFilterColors(formated_filter_color_array);
      } else {
        const formated_filter_size_array =
          filters_applied.available_sizes?.split(",") || [];
        console.log("formated_filter_size_array: ", formated_filter_size_array);
        setFilterSizes(formated_filter_size_array);

        const formated_filter_color_array =
          filters_applied.target_color_code?.split(",") || [];
        console.log(
          "formated_filter_color_array: ",
          formated_filter_color_array
        );
        setFilterColors(formated_filter_color_array);

        if (search_input) {
          dispatch(
            getProducts(
              search_input.split(" "),
              formated_filter_size_array,
              formated_filter_color_array
            )
          );
        } else {
          dispatch(
            getProducts(
              [],
              formated_filter_size_array,
              formated_filter_color_array
            )
          );
        }
      }
    } else {
      dispatch(getProducts([], [], []));
    }
  }, []);
  useEffect(() => {
    if (filters_available) {
      const formated_array = filters_available?.map((data) => {
        return data.target_color_code;
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
                {availableGenders.map((gender) => {
                  const getAppliedGenders = () => {
                    if (
                      filterGenders?.some(
                        (filterGenderValue) => filterGenderValue === gender
                      )
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  };
                  return (
                    <CustomCheckbox
                      isChecked={getAppliedGenders()}
                      toggleCheckbox={toggleCheckbox}
                      onClick={() => handleGenderFilter(gender)}
                    >
                      {" "}
                      <div className="mt-1 mb-1 filter-value">{gender}</div>
                    </CustomCheckbox>
                  );
                })}
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
              <div className="mt-2 mb-2 colors-mapper">
                {available_colors?.map((available_color) => {
                  const isAppliedColors = () => {
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
                    // <CustomCheckbox
                    //   isChecked={getAppliedColors()}
                    //   toggleCheckbox={toggleCheckbox}
                    //   onClick={() => handleColorFilter(available_color)}
                    // >
                    //   {" "}
                    //   <div className="mt-1 mb-1 filter-value">
                    //     {available_color}
                    //   </div>
                    // </CustomCheckbox>
                    <div
                      onClick={() => handleColorFilter(available_color)}
                      className="color-value cursor-pointer"
                      style={{
                        background: available_color,
                        border: "2px solid #fff",
                        boxShadow: isAppliedColors()
                          ? "0 0 0 1px #00000069"
                          : "0 0 0 1px transparent",
                      }}
                    ></div>
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
                  <div className="mt-1 mb-1 filter-value">
                    Price: Low to High
                  </div>
                </CustomCheckbox>
                <CustomCheckbox
                // isChecked={isChecked}
                // toggleCheckbox={toggleCheckbox}
                >
                  <div className="mt-1 mb-1 filter-value">
                    Price: High to Low
                  </div>
                </CustomCheckbox>
              </div>
            )}
          </div>
        </div>
        <div className="filter-action-btns">
          <div className="clear-btn" onClick={() => handleClearFilter()}>
            Clear
          </div>
          <div className="apply-btn" onClick={() => handleApplyFilter()}>
            Apply
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
