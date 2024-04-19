import React, { useEffect } from "react";

const ShopNowCards = () => {
  return (
    <div className="shop-now-cards">
      <div className="container-fluid">
        <div className="card-container">
          <div className="latest-card-bg">
            <div className="linear-bg">
              <div className="content container-fluid">
                <div className="default-color font-weight-1 heading">
                  Winter Sale
                </div>
                <div className="default-color sub-heading mt-1 mb-1">
                  15% Off on Latest outfits
                </div>
                <button className="linear-bg-btn">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card sweat-card-bg" >
            <div className="linear-bg">
              <div className="content container-fluid">
                <div className="default-color font-weight-1 heading">
                  Chill Vibes Collection: Hoodies
                </div>
                <div className="default-color sub-heading mt-1 mb-1">
                  Explore a range of hoodies and sweatshirts.
                </div>
                <button className="linear-bg-btn">Shop Now</button>
              </div>
            </div>
          </div>
          <div
            className="card explore-card-bg"
            // 
          >
            <div className="linear-bg">
              <div className="content container-fluid">
                <div className="default-color font-weight-1 heading">
                  Upgrade your style
                </div>
                <div className="default-color sub-heading mt-1 mb-1">
                  Explore more and redefine your wardrobe.
                </div>
                <button className="linear-bg-btn">Explore Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNowCards;
