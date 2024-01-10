import Aos from "aos";
import React, { useEffect } from "react";

const ShopNowCards = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 200,
      easing: 'ease',
      delay: 0
    });
  }, []);
  return (
    <div className="shop-now-cards">
      <div className="container-fluid">
        <div className="card-container">
          <div className="latest-card-bg">
            <div className="linear-bg">
              <div className="content container-fluid">
                <div className="default-color font-weight-1 heading">
                  15% Off on Latest outfits
                </div>
                <div className="default-color sub-heading mt-1 mb-1">
                  Get a stylish upgrade! Enjoy a trendy 15% off on our latest
                  collection of clothes.
                </div>
                <button className="linear-bg-btn">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card sweat-card-bg" data-aos="fade-right">
            <div className="linear-bg">
              <div className="content container-fluid">
                <div className="default-color font-weight-1 heading">
                  Explore a range of hoodies and sweatshirts
                </div>
                <div className="default-color sub-heading mt-1 mb-1">
                  Discover the perfect blend of comfort and style with our
                  exclusive men's sweatwear collection.{" "}
                </div>
                <button className="linear-bg-btn">Shop Now</button>
              </div>
            </div>
          </div>
          <div className="card explore-card-bg" data-aos="fade-right"  data-aos-delay="300">
            <div className="linear-bg">
              <div className="content container-fluid">
                <div className="default-color font-weight-1 heading">
                  Upgrade your style with our exclusive range of men's wears.
                </div>
                <div className="default-color sub-heading mt-1 mb-1">
                  Explore more and redefine your wardrobe with our range of
                  men's wears.
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
