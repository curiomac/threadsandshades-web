import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ConsumerBookingNewSkeleton = () => {
  return (
    //   <div>
    //     <Skeleton height={100} width={300} /> {/* Example of a loading placeholder */}
    //     <Skeleton count={5} /> {/* Multiple loading placeholders */}
    //   </div>
    <div className="d-flex gap-5">
      <div className="vehicle-detail-info">
        <div>
          <div className="vehicle-basic-info d-flex justify-content-space-between gap-5">
            <Skeleton height={200} width={300} />
            <div className="vehicle-info-content primary-font font-14">
              <div className="d-flex align-items-center justify-content-space-between">
                <Skeleton count={1} />
              </div>
              <div className="d-flex align-items-center justify-content-space-between mt-1 mb-1">
                <Skeleton count={1} />
              </div>
              <div className="d-flex align-items-center justify-content-space-between mt-1 mb-1">
                <Skeleton count={1} />
              </div>
              <div className="d-flex align-items-center justify-content-space-between mt-1 mb-1">
                <Skeleton count={1} />
              </div>
            </div>
          </div>
          {/* <div className="booking-duration d-flex align-items-center">
              <div className=" w-fill">
                <div className="primary-font font-16 font-weight-2">
                  Booking Duration
                </div>
                <div className="d-flex align-items-center justify-content-space-between mt-1 mb-1">
                  <div className="font-14">
                    <div className="secondary-font">Pickup</div>
                    <div className="primary-font">Wed, 25 Oct, 8:00 AM</div>
                  </div>
                  <div className="secondary-font">
                    <div className="font-14">8hrs</div>
                    <div className="d-flex align-items-center justify-content-center">
                      <BsArrowRight />
                    </div>
                  </div>
                  <div className="font-14">
                    <div className="secondary-font">Drop</div>
                    <div className="primary-font">Wed, 25 Oct, 4:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="car-amenities">
              <div className="w-fill">
                <div className="primary-font font-16 font-weight-2">
                  Vehicle Amenities
                </div>
                <div className="vehicle-amenities-container mt-1 mb-1">
                  {car_amenities_demo.map((value) => {
                    return (
                      <div className="d-flex align-items-center gap-1 font-14 secondary-font">
                        <div className="d-flex align-items-center font-18 default-font">
                          {getAmenitiesIcon(value)}
                        </div>
                        <div>{value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="cancelation-policy d-flex align-items-center">
              <div className=" w-fill">
                <div className="primary-font font-16 font-weight-2">
                  Cancellation Policy
                </div>
                <div>
                  <div className="primary-font d-flex align-items-center gap-2 mt-1 mb-1">
                    <div className="d-flex align-items-center">
                      <HiOutlineClipboardDocumentList />
                    </div>
                    <div>User Policy</div>
                  </div>
                  <div className="secondary-font font-14">
                    I hereby agree to the terms and conditions of the Lease
                    Agreement with Host.
                  </div>
                  <Link to="user-policy" className="font-14 default-font">
                    Open User Policy
                  </Link>
                </div>
              </div>
            </div> */}
        </div>
      </div>
      <div className="vehicle-booking-info">
        <div className="vehicle-booking-tab">
          {/* <div className="font-18 primary-font">Wallet & Offers</div>
          <div
            className="d-flex align-items-center justify-content-space-between mt-2 mb-2 cursor-pointer"
            onClick={() => setApplyCoupons(!applyCoupons)}
          >
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center default-font font-20">
                <BiSolidCoupon />
              </div>
              <div className="primary-font font-14">Apply Coupons</div>
            </div>
            <div
              className={`d-flex align-items-center primary-font ${
                applyCoupons ? "transform-90" : "transform-0"
              }`}
            >
              <IoIosArrowForward />
            </div>
          </div>
          {applyCoupons && (
            <div className="apply-coupons d-flex align-items-center justify-content-space-between">
              <div className="input w-fill">
                <input
                  placeholder="Enter coupon code"
                  value={couponValue}
                  onChange={(e) =>
                    setCouponValue(e.target.value.toLocaleUpperCase())
                  }
                />
              </div>
              <div className="btn">
                <button className="cursor-pointer font-family-poppins">
                  Apply
                </button>
              </div>
            </div>
          )}
          <div
            className="d-flex align-items-center justify-content-space-between mt-2 mb-2 cursor-pointer"
            onClick={() => setUseWallet(!useWallet)}
          >
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center default-font font-20">
                <IoIosWallet />
              </div>
              <div className="primary-font font-14">Use Wallet</div>
            </div>
            <div
              className={`d-flex align-items-center primary-font ${
                useWallet ? "transform-90" : "transform-0"
              }`}
            >
              <IoIosArrowForward />
            </div>
          </div> */}
          {/* {useWallet && (
          <div>
            <input />
          </div>
        )} */}
          {/* <div>
            <div className="font-14 secondary-font">Total amount to pay</div>
            <div className="d-flex align-items-center justify-content-space-between">
              <div className="primary-font d-flex align-items-center font-20">
                <div className="d-flex align-items-center">
                  <BiDollar />
                </div>
                <div>{vehicleData.price * 8}</div>
              </div>
              <div className="primary-font d-flex align-items-center cursor-pointer">
                <div className="font-14">See Details</div>
                <div className="d-flex align-items-center">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </div>
          <div className="book-now-btn mt-2 mb-2">
            <button className="cursor-pointer font-family-poppins">
              BOOK NOW
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ConsumerBookingNewSkeleton;
