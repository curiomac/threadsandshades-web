import React from "react";

const SpinnerLoader = ({ dark, brand }) => {
  return <div className={`spinner ${dark && "dark"} ${brand && 'brand'}`}></div>;
};

export default SpinnerLoader;
