import React, { useEffect, useState } from "react";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import { FaShoppingBasket } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoChatbubbles } from "react-icons/io5";
import { getOrder } from "../../../../../redux/actions/orderAction";
import moment from "moment";
import { RxCross2 } from "react-icons/rx";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";

const OrderStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trigger = getQueryParam("proceed");
  const order_id = getQueryParam("order_id");
  const { proceed } = useSelector((state) => state.resCartState);
  const { products } = useSelector((state) => state.productsState);
  const { order } = useSelector((state) => state.orderState);
  const [orderResponse, setOrderResponse] = useState({});
  const [orderStatusValues, setOrderStatusValues] = useState(["3", "3", "3"]);
  const order_status_values = [
    {
      status: "processing",
      label: "Order Placed",
      bg: "#fe2d5a29",
      color: "#fe2d5a",
    },
    {
      status: "shipped",
      label: "In Transist",
      bg: "#feb70126",
      color: "#feb701",
    },
    {
      status: "delivered",
      label: "Out For Delivery",
      bg: "#00a86b26",
      color: "#00A86B",
    },
  ];
  const getOrderStatus = (statusFor) => {
    console.log("orderStatusValues: ", orderStatusValues);
    switch (statusFor) {
      case "o-p":
        if (orderStatusValues[0] === "1") {
          return "passed";
        } else if (orderStatusValues[0] === "2") {
          return "active";
        } else if (orderStatusValues[0] === "3") {
          return "pending";
        }
        return "unknown";

      case "i-t":
        if (orderStatusValues[1] === "1") {
          return "passed";
        } else if (orderStatusValues[1] === "2") {
          return "active";
        } else if (orderStatusValues[1] === "3") {
          return "pending";
        }
        return "unknown";
      case "o-f-d":
        if (orderStatusValues[2] === "1") {
          return "passed delivered";
        } else if (orderStatusValues[2] === "2") {
          return "active";
        } else if (orderStatusValues[2] === "3") {
          return "pending";
        }
        return "unknown";
      default:
        return "unknown";
    }
  };
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger]);
  useEffect(() => {
    const payload = {
      order_id,
    };
    dispatch(getOrder(payload));
  }, []);
  useEffect(() => {
    setOrderResponse(order);
    switch (order.order_status) {
      case "processing":
        setOrderStatusValues(["1", "2", "3"]);
        break;
      case "shipped":
        setOrderStatusValues(["1", "1", "2"]);
        break;
      case "delivered":
        setOrderStatusValues(["1", "1", "1"]);
        break;
      default:
        setOrderStatusValues(["3", "3", "3"]);
        break;
    }
  }, [order]);
  return (
    <div
      className={`order-status ${
        proceed === "true" ? "hide-cart-items" : "show-cart-items"
      }`}
    >
      <div className="order-status-container">
        <div className="mt-1 mb-5">
          <div className="font-size-3 font-weight-1">Track Your Package</div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <div className="font-14 font-weight-1">Estimated Delivery:</div>
            <div className="font-14">
              {moment(
                orderResponse?.expected_delivery_date,
                "DD-MM-YYYY"
              ).format("MMM DD, YYYY")}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between">
            <div
              className="order-status-value"
              style={{
                background: order_status_values.find(
                  (value) => value?.status === order?.order_status
                )?.bg,
                color: order_status_values.find(
                  (value) => value?.status === order?.order_status
                )?.color,
              }}
            >
              {
                order_status_values.find(
                  (value) => value?.status === order?.order_status
                )?.label
              }
            </div>
            <div className="font-12 primary-color cursor-pointer font-weight-1 text-decoration-underline">
              How will my item be delivered?
            </div>
          </div>
        </div>
        <div className="order-status-info d-flex align-items-center justify-content-center">
          <div className="order-status-info-content d-flex align-items-center justify-content-space-between w-fill">
            <div className="status">
              <div className="d-flex align-items-center justify-content-center">
                <div className={`icon ${getOrderStatus("o-p")}`}>
                  <FaShoppingBasket />
                </div>
              </div>
              <div className="font-12 mt-2 text-align-center font-weight-1">
                Order Placed
              </div>
              <div className="font-12 mt-1 text-align-center">
                {moment(orderResponse?.createdAt).format("MMM DD, YYYY")}
              </div>
            </div>
            <div
              className={`status-bar ${getOrderStatus(
                "i-t"
              )} in-progress res-992px-d-none`}
            ></div>
            <div className="status ">
              <div className="d-flex align-items-center justify-content-center">
                <div className={`icon ${getOrderStatus("i-t")}`}>
                  <FaTruck />
                </div>
              </div>
              <div className="font-12 mt-2 text-align-center font-weight-1">
                In Transist
              </div>
              <div className="font-12 mt-1 text-align-center">N/A</div>
            </div>
            <div
              className={`status-bar ${getOrderStatus(
                "o-f-d"
              )} in-progress res-992px-d-none`}
            ></div>
            <div className="status ">
              <div className="d-flex align-items-center justify-content-center">
                <div className={`icon ${getOrderStatus("o-f-d")}`}>
                  <BsFillBoxSeamFill />
                </div>
              </div>
              <div className="font-12 mt-2 text-align-center font-weight-1">
                Out For Delivery
              </div>
              <div className="font-12 mt-1 text-align-center">
                Estimated:{" "}
                {moment(
                  orderResponse?.expected_delivery_date,
                  "DD-MM-YYYY"
                ).format("MMM DD, YYYY")}
              </div>
            </div>
          </div>
        </div>
        <div className="order-info">
          <div className="order-product-details">
            <div className="order-details">
              <div className="order-details-heading">Order Details</div>
              <div className="p-3 d-flex align-items-center justify-content-space-between res-682px-d-block">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="font-14 res-font font-weight-1">Date Orderd:</div>
                    <div className="font-14 res-font">
                      {moment(orderResponse?.createdAt).format("MMM DD, YYYY")}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="font-14 res-font font-weight-1">Order Number:</div>
                    <div className="font-14 res-font">{orderResponse?._id}</div>
                  </div>
                </div>
                <div>
                  <button className="print-inv-btn res-font">Print Invoice</button>
                </div>
              </div>
            </div>
            <div className="delivery-details">
              <div className="delivery-details-heading">Delivery Details</div>
              <div className="p-3">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="font-14 font-weight-1">
                      Delivery Address:{" "}
                    </div>
                    <div className="font-12">
                      {orderResponse?.billing_address?.first_name}{" "}
                      {orderResponse?.billing_address?.last_name},{" "}
                      {orderResponse?.billing_address?.address} -{" "}
                      {orderResponse?.billing_address?.postal_code}, Phone:{" "}
                      {orderResponse?.billing_address?.mobile_no}
                    </div>
                  </div>
                </div>
                <div className="mt-4 order-details-container">
                  {orderResponse?.order_items?.map((order_item, index) => {
                    return (
                      <div
                        className={`order-item ${
                          index < orderResponse?.order_items?.length - 1
                            ? "end"
                            : ""
                        }`}
                      >
                        <div className="d-flex gap-3">
                          <div
                            className="product-img cursor-pointer"
                            onClick={() =>
                              navigate(
                                `${LOCKED_CLOTH_PAGE}?type=men&product_id=${order_item?.product_id}`
                              )
                            }
                          >
                            <img
                              src={
                                order_item?.product_images?.length > 0 &&
                                order_item?.product_images[0]
                              }
                              alt="image_1"
                            />
                          </div>
                          <div className="product-info">
                            <div
                              className="product-title cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `${LOCKED_CLOTH_PAGE}?type=men&product_id=${order_item?.product_id}`
                                )
                              }
                            >
                              {order_item?.product_title}
                            </div>
                            <div className="selected-product-features">
                              <div className="d-flex align-items-center gap-3">
                                <div className="font-14 font-weight-1 selected-size">
                                  {order_item?.selected_size}
                                </div>
                                <div className="custom-vr"></div>
                                <div
                                  className="target-color"
                                  style={{
                                    backgroundColor:
                                      order_item?.target_color_code,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="d-flex gap-3 product-price-details res-849px-d-flex mt-2">
                                <div className="d-flex align-items-center gap-2 product-price-qty">
                                  <div>{order_item?.selected_quantity}</div>
                                  <RxCross2 />
                                  <div className="d-flex align-items-center">
                                    <MdCurrencyRupee />
                                    <div>{order_item?.fixed_price}</div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center price">
                                  <MdCurrencyRupee />
                                  <div>
                                    {order_item?.selected_quantity *
                                      order_item?.fixed_price}
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div className="d-flex gap-3 product-price-details res-849px-d-none">
                          <div className="d-flex align-items-center gap-2 product-price-qty">
                            <div>{order_item?.selected_quantity}</div>
                            <RxCross2 />
                            <div className="d-flex align-items-center">
                              <MdCurrencyRupee />
                              <div>{order_item?.fixed_price}</div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <MdCurrencyRupee />
                            <div>
                              {order_item?.selected_quantity *
                                order_item?.fixed_price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="order-payment-details">
            <div className="payment-details">
              <div className="order-payment-heading">Order Total</div>
              <div className="p-3">
                <div>
                  <div className="d-flex align-items-center justify-content-space-between">
                    <div className="font-14">Subtotal</div>
                    <div className="d-flex align-items-center font-14">
                      <MdCurrencyRupee />
                      <div>{orderResponse?.order_summary?.total_mrp}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-space-between mt-2">
                    <div className="font-14">Shipping</div>
                    <div className="font-14">Free</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-space-between mt-2">
                    <div className="font-14">Sale Tax</div>
                    <div className="font-14">₹0</div>
                  </div>
                  <div className="custom-hr mt-2"></div>
                  <div className="d-flex align-items-center justify-content-space-between mt-2">
                    <div className="font-14 font-weight-1">Total</div>
                    <div className="d-flex align-items-center font-14">
                      <MdCurrencyRupee />
                      <div>{orderResponse?.order_summary?.cart_total}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="get-msg-details">
              <div className="p-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center justify-content-center">
                    <IoChatbubbles className="d-flex align-items-center justify-content-center font-size-3" />
                  </div>
                  <div className="font-weight-1">
                    Get text msg notifications
                  </div>
                </div>
                <div className="font-12 mt-2">
                  Get instant updates on your order status, including shipping
                  confirmation and estimated delivery time, ensuring you're
                  always in the loop with your package's journey.
                </div>
                <div className="phone-number-input">
                  <div className="label">Phone Number</div>
                  <input />
                </div>
                <div className="font-12 d-flex align-items-center mt-2">
                  <input type="checkbox" /> I agree to terms and conditions
                </div>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
