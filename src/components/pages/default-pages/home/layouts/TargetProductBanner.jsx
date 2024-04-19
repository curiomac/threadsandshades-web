import React from "react";
import target_poster_female_1 from "../../../../../assets/imgs/store-room/target-poster-female-1-shadowed.png";
import target_poster_female_3 from "../../../../../assets/imgs/store-room/target-poster-female-3-shadowed.png";
import target_poster_female_5 from "../../../../../assets/imgs/store-room/target-poster-female-5-shadowed.png";
import target_poster_female_4 from "../../../../../assets/imgs/store-room/target-poster-female-4-shadowed.png";
import target_poster_male_2 from "../../../../../assets/imgs/store-room/target-poster-male-1-shadowed.png";
import target_poster_male_3 from "../../../../../assets/imgs/store-room/target-poster-male-3-shadowed.png";
import target_poster_male_4 from "../../../../../assets/imgs/store-room/target-poster-male-4-shadowed.png";

const TargetProductBanner = () => {
  return (
    <div className="target-product-banner">
      <div className="container-fluid">
        <div className="field-container">
          <div className="target-parent-card">
            <div
              className="wrapped-child-card-mono"
              style={{ background: "rgb(223 170 112)" }}
            >
              <div className="content" style={{ color: "#fff" }}>
                <div className="quote">
                  Sizzling Summer Sale: Hot Looks, Cool Prices!
                </div>
                <div className="shop-now-nav">Shop Now</div>
              </div>
              <div
                className="poster"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <img
                  src={target_poster_female_1}
                  alt="target-poster-female-1"
                />
              </div>
            </div>
            <div className="wrapped-child-card-dual">
              <div
                className="sub-card"
                style={{ background: "rgb(245 147 55)" }}
              >
                <div className="content" style={{ color: "#fff" }}>
                  <div className="quote">
                    Fashion Forward: Unbeatable Deals Await!
                  </div>
                  <div className="shop-now-nav">Shop Now</div>
                </div>
                <div
                  className="poster"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    src={target_poster_female_5}
                    alt="target-poster-female-5"
                    style={{
                      position: "relative",
                      left: "84px",
                      bottom: "50px",
                    }}
                  />
                </div>
              </div>
              <div
                className="sub-card"
                style={{
                  background: "#61bdc0",
                }}
              >
                <div className="content" style={{ color: "#fff" }}>
                  <div className="quote">
                    Trendsetter's Paradise: Unmissable Discounts!
                  </div>
                  <div className="shop-now-nav">Shop Now</div>
                </div>
                <div className="poster">
                  <img
                    src={target_poster_female_3}
                    alt="target-poster-female-3"
                    style={{ position: "relative", right: "339px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="target-parent-card">
            <div className="wrapped-child-card-dual">
              <div className="sub-card" style={{ background: "rgb(33 74 171)" }}>
                <div className="content" style={{ color: "#fff" }}>
                  <div className="quote">
                    Fashion Frenzy: Discounts on Your Favorites!
                  </div>
                  <div className="shop-now-nav">Shop Now</div>
                </div>
                <div
                  className="poster"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    src={target_poster_male_2}
                    alt="target-poster-female-5"
                    style={{
                      position: "relative",
                      left: "64px",
                      bottom: "30px",
                    }}
                  />
                </div>
              </div>
              <div
                className="sub-card"
                style={{
                  background: "#999cad",
                }}
              >
                <div className="content" style={{ color: "#fff" }}>
                  <div className="quote">Unwrap Style: Big Savings Inside!</div>
                  <div className="shop-now-nav">Shop Now</div>
                </div>
                <div className="poster">
                  <img
                    src={target_poster_male_3}
                    alt="target-poster-male-3"
                    style={{
                      position: "relative",
                      right: "320px",
                      height: "445px",
                      width: "352px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="wrapped-child-card-mono"
              style={{ background: "#0db5a5" }}
            >
              <div className="content" style={{ color: "#fff" }}>
                <div className="quote">
                  Limited Time, Unlimited Style: Grab Your Deals!
                </div>
                <div className="shop-now-nav">Shop Now</div>
              </div>
              <div
                className="poster"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <img src={target_poster_male_4} alt="target-poster-male-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetProductBanner;
