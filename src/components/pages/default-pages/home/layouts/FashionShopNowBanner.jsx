import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const FashionShopNowBanner = () => {
  const mapData = [
    "Detailing and Embellishments with Specialty Threads",
    "Versatile Shades for Timeless Style",
    "Texture and Finish for Enhanced Appeal",
    "Customization and Branding Opportunities",
    "Stitching and Seam Detailing for Durability",
  ];
  return (
    <div className="fasion-shop-now-banner">
      <div className="container-fluid">
        <div className="banner">
        <div className="height-follow"></div>
          <div class="hr-container">
            <div class="hr-scroll">
              <div className="data-anim">
                {mapData?.map((data) => {
                  return (
                    <div className="d-flex align-items-center data">
                      <div className="data">{data}</div>
                      <div className="btn-container">
                        <button>
                          <div>Shop Collection</div>
                          <div className="arrow-ic">
                            <FaArrowRightLong />
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionShopNowBanner;
