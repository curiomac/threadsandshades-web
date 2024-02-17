import React from "react";

const SpinnerLoader = ({ dark }) => {
  return <div className={`spinner ${dark && "dark"}`}></div>;
};

export default SpinnerLoader;
