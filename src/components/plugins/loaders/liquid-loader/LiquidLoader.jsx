import React from "react";

const LiquidLoader = () => {
  return (
    <div className="liquid-loader">
      <div class="container">
        <div class="loader">
          <span style={{ "--i": 0 }}></span>
          <span style={{ "--i": 1 }}></span>
          <span style={{ "--i": 2 }}></span>
          <span style={{ "--i": 3 }}></span>
          <span style={{ "--i": 4 }}></span>
          <span style={{ "--i": 5 }}></span>
          <span style={{ "--i": 6 }}></span>
          <span style={{ "--i": 7 }}></span>
        </div>
      </div>
      <svg>
        <filter id="Gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9.99" />
          <feColorMatrix
            values="
      1 0 0 0 0
      0 1 0 0 0
      0 0 1 0 0
      0 0 0 20 -10"
          />
        </filter>
      </svg>
    <h2>Loading...</h2>
    </div>
  );
};

export default LiquidLoader;
