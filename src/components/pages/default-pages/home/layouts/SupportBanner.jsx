import React from "react";
import { IoIosTimer } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaHeadsetSolid } from "react-icons/lia";
const SupportBanner = () => {
  return (
    <div className="support-banner">
      <div className="container-fluid">
        <div className="contents">
          <div className="content">
            <div>
              <TbTruckDelivery className="font-size-5 d-flex align-items-center" />
            </div>
            <div>
              <div className="heading">Fast and Safe Delivery</div>
              <div className="sub-heading">
                Free delivery for orders above ₹999
              </div>
            </div>
          </div>
          <div className="content">
            <div>
              <IoIosTimer className="font-size-5 d-flex align-items-center" />
            </div>
            <div>
              <div className="heading">On Time Delivery</div>
              <div className="sub-heading">
                Efficient shipping, on your schedule
              </div>
            </div>
          </div>
          <div className="content">
            <div>
              <LiaHeadsetSolid className="font-size-5 d-flex align-items-center" />
            </div>
            <div>
              <div className="heading">Need Support?</div>
              <div className="sub-heading">
                For any inquiries, our support team is ready to assist you
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBanner;
