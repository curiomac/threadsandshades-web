import React, { useEffect } from 'react';
// import FashionBanner from './layouts/FashionBanner';
import ShopNowCards from './layouts/ShopNowCards';
import TopSellingBanner from './layouts/TopSellingBanner';
import ShopForBanner from './layouts/ShopForBanner';
import SupportBanner from './layouts/SupportBanner';

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className='home'>
      {/* <FashionBanner /> */}
      <ShopForBanner />
      <ShopNowCards />
      <SupportBanner />
      <TopSellingBanner />
    </div>
  )
}

export default Home;