import React from 'react';
import FashionBanner from './layouts/FashionBanner';
import ShopNowCards from './layouts/ShopNowCards';
import TopSellingBanner from './layouts/TopSellingBanner';
import ShopForBanner from './layouts/ShopForBanner';
import SupportBanner from './layouts/SupportBanner';

const Home = () => {
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