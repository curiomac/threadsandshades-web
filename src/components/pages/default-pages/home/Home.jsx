import React, { useEffect } from "react";
import FashionBanner from "./layouts/FashionBanner";
import ShopNowCards from "./layouts/ShopNowCards";
import TopSellingBanner from "./layouts/TopSellingBanner";
import ShopForBanner from "./layouts/ShopForBanner";
import SupportBanner from "./layouts/SupportBanner";
import NewCollectionsList from "./layouts/NewCollectionsList";
import FashionShopNowBanner from "./layouts/FashionShopNowBanner";
import TargetProductBanner from "./layouts/TargetProductBanner";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="home">
      {/* <FashionBanner /> */}
      <ShopForBanner />
      <ShopNowCards />
      <SupportBanner />
      <TargetProductBanner />
      <NewCollectionsList />
      <FashionShopNowBanner />
      {/* <TopSellingBanner /> */}
    </div>
  );
};

export default Home;
