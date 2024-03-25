import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

const CustomDropdown = ({
  value,
  placeholder,
  onSelect,
  className,
  options,
  onAddOption,
  noOptionContent,
  addOptionValue,
  disabled,
  optionTarget,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionInput, setOptionInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  console.log("options", options);
  const dropdownRef = useRef(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setOptionInput(option);
    onSelect(option);
    setIsOpen(false);
  };
  const handleInputChange = (e) => {
    setOptionInput(e.target.value);
    if (String(e.target.value) === "") {
      setFilteredOptions(options);
    } else {
      if (optionTarget) {
        const filteredOptionValues = options?.filter((option) => {
          const optionValues = String(option[optionTarget]).toLowerCase();
          return optionValues?.includes(e.target.value?.toLowerCase());
        });
        setFilteredOptions(filteredOptionValues);
      } else {
        const filteredOptionValues = options?.filter((option) => {
          const optionValues = String(option).toLowerCase();
          return optionValues?.includes(e.target.value?.toLowerCase());
        });
        setFilteredOptions(filteredOptionValues);
      }
    }
  };
  const addOption = () => {
    const trimmedOption = optionInput.trim();
    if (trimmedOption && !options.includes(trimmedOption) && addOptionValue) {
      onAddOption([...options, trimmedOption]);
      setFilteredOptions([...options, trimmedOption]);
      setOptionInput("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addOption();
    }
  };
  useEffect(() => {
    setOptionInput(value);
    console.log(filteredOptions, "<<<<<<value");
    console.log(value, "<<<<<<<<<<value");
    if (value) {
      const trimmedOption = value.trim();
      if (trimmedOption && !options.includes(trimmedOption) && addOptionValue) {
        onAddOption([...options, trimmedOption]);
        setFilteredOptions([...options, trimmedOption]);
      }
    }
  }, [value]);
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {addOptionValue && optionInput && (
        <div className="res-add-key">
          <div className="icon-container">
            <FaPlus className="ic-plus" onClick={addOption} />
          </div>
        </div>
      )}
      {!addOptionValue && (
        <div className="res-dropdown-ic">
          <div className="icon-container">
            <FaAngleDown className={`ic ${isOpen && 'dropdown-open'}`} onClick={handleToggle}/>
          </div>
        </div>
      )}
      <input
        value={optionInput}
        className={`dropdown-toggle ${className}`}
        placeholder={placeholder}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        disabled={disabled ? true : false}
      />
      {isOpen && (
        <ul className="dropdown-menu">
          {console.log("filteredOptions: ", filteredOptions)}
          {filteredOptions?.length > 0 ? (
            filteredOptions?.map((option) => {
              return (
                <li
                  onClick={() =>
                    handleSelect(optionTarget ? option[optionTarget] : option)
                  }
                >
                  {optionTarget ? option[optionTarget] : option}
                </li>
              );
            })
          ) : (
            <li>{noOptionContent ? noOptionContent : "No options found"}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
