import React from "react";
const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <div className="product-info-contents">
        <div className="heading-product w-fit-content">
          <div>Product Info</div>
          <div className="drop-border"></div>
        </div>
        <div className="products-card">
          <div className="card-screen">
            <div className="overview">
              <div className="product-overview">
                <div className="title">Product Overview</div>
                <div className="d-flex align-items-center gap-4">
                  <div className="heading">Brand</div>
                  <div className="data">Threads & Shades</div>
                </div>
                <div className="d-flex align-items-center gap-4">
                  <div className="heading">Type</div>
                  <div className="data">{product?.product_type}</div>
                </div>
                <div className="d-flex align-items-center gap-4">
                  <div className="heading">Color</div>
                  <div className="data">{product?.target_color}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-screen">
            <div className="product-description">
              <div className="title">Description</div>
              <div className="description">{product?.product_label}</div>
            </div>
          </div>
          <div className="card-screen">
            <div className="delivery-return-policy">
              <div className="title">Delivery & Return Policy</div>
              <div className="description">
                Our Delivery Policy ensures prompt processing and shipping,
                typically within 1-2 business days. We offer various shipping
                options, including standard, express, and international, with
                tracking provided for your convenience. For returns, our policy
                allows eligible items to be returned within 30 days of delivery,
                provided they are unused and in their original condition. Simply
                contact us for a return authorization and instructions. Refunds
                are processed within 7-10 business days to the original payment
                method, and return shipping costs are the responsibility of the
                customer unless it's due to our error or a defective product. We
                strive to make your shopping experience as seamless as possible.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
