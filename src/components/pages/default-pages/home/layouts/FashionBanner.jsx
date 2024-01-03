import React from "react";

const FashionBanner = () => {
  return (
    <div className="fashion-banner">
      <div className="banner-dark">
        <div className="container">
          <div className="fashion-offer-contents d-flex align-items-center">
            <div>
              <div className="font-size-2">This Winter</div>
              <div className="font-size-8 ternary-color">FLASH SALE FRENZY</div>
              <div className="font-size-2">
                Every second counts. Hurry up, take action, and craft your
                destiny.
              </div>
              <button className="grab-now-btn mt-3 mb-3 cursor-pointer">Grab Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionBanner;
