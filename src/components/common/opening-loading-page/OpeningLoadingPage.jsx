import React from "react";
import DotLoader from "../../plugins/loaders/dot-loader/DotLoader";
import logo from "../../../assets/imgs/home/logo.png";

const OpeningLoadingPage = () => {
  return (
    <div className="opening-loading-page">
      <div>
        <img src={logo} height={60} width={155} className="mb-3"/>
        <DotLoader />
      </div>
    </div>
  );
};

export default OpeningLoadingPage;
