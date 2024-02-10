import React, { useEffect } from 'react'
import ProductDetails from './layouts/ProductDetails'

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
    </div>
  )
}

export default LockedCloth