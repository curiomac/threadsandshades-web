import React, { useState } from "react";
import { FaCalendarAlt, FaPercent } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
const ProductInfo = ({ product }) => {
  const switches = [
    {
      id: 1,
      value: "Overview",
    },
    {
      id: 2,
      value: "Shipping Details",
    },
  ];
  const [selectedSwitchId, setSelectedSwitchId] = useState(1);
  const getInfoContent = () => {
    switch (selectedSwitchId) {
      case 1: {
        return (
          <div className="overview">
            <div className="product-overview">
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
            <div className="product-description">
              <div className="heading">Discription</div>
              <div className="description">{product?.product_label}</div>
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div className="shipping-details">
            <div className="shipping-details-content">
              <div className="card">
                <div className="ic">
                  <FaPercent className="val" size={10} />
                </div>
                <div className="card-content">
                  <div className="title">Free Delivery</div>
                  <div className="quote">Delivery Discounted And Free</div>
                </div>
              </div>
              <div className="card">
                <div className="ic">
                  <BsBoxFill size={20} />
                </div>
                <div className="card-content">
                  <div className="title">Package</div>
                  <div className="quote">Regular Premium Box</div>
                </div>
              </div>
              <div className="card">
                <div className="ic">
                  <TbTruckDelivery size={24} />
                </div>
                <div className="card-content">
                  <div className="title">Delivery Time</div>
                  <div className="quote">6 - 12 Working Days</div>
                </div>
              </div>
              <div className="card">
                <div className="ic">
                  <FaCalendarAlt size={18} />
                </div>
                <div className="card-content">
                  <div className="title">Delivery Time</div>
                  <div className="quote">6 - 12 Working Days</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };
  return (
    <div className="product-info">
      <div className="product-info-contents">
        <div className="heading">Product Info</div>
        <div className="info-switch">
          {switches.map((switchItem) => {
            return (
              <div
                className={`link ${
                  selectedSwitchId === switchItem.id ? "active" : ""
                }`}
                onClick={() => setSelectedSwitchId(switchItem.id)}
              >
                {switchItem.value}
              </div>
            );
          })}
        </div>
        <div className="info-content">{getInfoContent()}</div>
      </div>
    </div>
  );
};

export default ProductInfo;
