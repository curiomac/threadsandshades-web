import Aos from "aos";
import React, { useEffect } from "react";

const FashionBanner = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 50,
      easing: "ease",
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="fashion-banner">
        <div className="banner-dark">
          <div className="container-fluid">
            <div className="fashion-offer-contents d-flex align-items-center">
              <div>
                <div className="font-size-2" data-aos="fade-right">
                  This Winter
                </div>
                <div
                  className="font-size-8 ternary-color"
                  style={{
                    width: "67.5%",
                  }}
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  FLASH SALE FRENZY
                </div>
                <div data-aos="fade-right" data-aos-delay="300">
                  <div className="font-size-2 w-5">
                    Every second counts. Hurry up, take action, and craft your
                    destiny.
                  </div>
                  <button className="grab-now-btn mt-3 mb-3 cursor-pointer">
                    Grab Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionBanner;
