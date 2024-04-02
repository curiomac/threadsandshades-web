import React, { useEffect } from 'react'
import ProductDetails from './layouts/ProductDetails';
import TopSellingBanner from '../home/layouts/TopSellingBanner';

const LockedCloth = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
        <ProductDetails />
        <TopSellingBanner />
    </div>
  )
}

export default LockedCloth