import React from "react";
import { FaCalendarAlt, FaPercent } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";

const ProductDeliveryBanner = () => {
  return (
    <div className="product-delivery-banner">
      <div className="heading-product w-fit-content">
        <div>Product Delivery</div>
        <div className="drop-border"></div>
      </div>
      <div className="shipping-details">
        <div className="shipping-details-content">
          <div className="card">
            <div>
              <div className="ic">
                <FaPercent className="primary-color" size={20} style={{
                    padding: "15px",
                    border: "1px solid #ebebeb",
                    borderRadius: "5px"
                }}/>
              </div>
              <div className="card-content">
                <div className="title">Free Delivery</div>
                <div className="quote">Delivery Discounted And Free</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="ic">
                <BsBoxFill className="primary-color" size={22} style={{
                    padding: "15px",
                    border: "1px solid #ebebeb",
                    borderRadius: "5px"
                }}/>
              </div>
              <div className="card-content">
                <div className="title">Package</div>
                <div className="quote">Regular Premium Box</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="ic">
                <TbTruckDelivery className="primary-color" size={28} style={{
                    padding: "15px",
                    border: "1px solid #ebebeb",
                    borderRadius: "5px"
                }}/>
              </div>
              <div className="card-content">
                <div className="title">On Time Delivery</div>
                <div className="quote">6 - 12 Working Days</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="ic">
                <FaCalendarAlt className="primary-color" size={24} style={{
                    padding: "15px",
                    border: "1px solid #ebebeb",
                    borderRadius: "5px"
                }}/>
              </div>
              <div className="card-content">
                <div className="title">Delivery Time</div>
                <div className="quote">6 - 12 Working Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeliveryBanner;
