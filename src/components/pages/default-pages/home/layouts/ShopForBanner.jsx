import React from "react";

const ShopForBanner = () => {
  return (
    <div className="shop-for-banner">
      <div className="container-fluid">
        <div className="banner-container">
          <div className="men">
            <div className="contents-container">
              <div className="contents">
                <div className="heading">NEW COLLECTION</div>
                <div className="shop-for">SHOP MEN'S</div>
                <div className="discover-btn">
                  <div className="btn">DISCOVER NOW</div>
                </div>
              </div>
            </div>
          </div>
          <div className="women">
            <div className="contents-container">
              <div className="contents">
                <div className="heading">NEW COLLECTION</div>
                <div className="shop-for">SHOP WOMEN'S</div>
                <div className="discover-btn">
                  <div className="btn">DISCOVER NOW</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopForBanner;
