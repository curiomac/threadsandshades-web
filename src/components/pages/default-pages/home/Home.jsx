import React from 'react';
import FashionBanner from './layouts/FashionBanner';
import ShopNowCards from './layouts/ShopNowCards';

const Home = () => {
  return (
    <div className='home'>
      <FashionBanner />
      <ShopNowCards />
    </div>
  )
}

export default Home;