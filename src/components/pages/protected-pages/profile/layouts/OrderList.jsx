import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../../redux/actions/orderAction";
import { RxCross2 } from "react-icons/rx";
import { PiCurrencyInrBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  LOCKED_CLOTH_PAGE,
  ORDER_STATUS_PAGE,
} from "../../../../../helpers/route-paths/paths";
import { getCurrencyFormat } from "../../../../../helpers/currency-formatter/getCurrencyFormat";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tabs = ["All", "Waiting Payment", "Order In Progress", "Order"];
  const order_status_values = [
    {
      status: "processing",
      bg: "#fe2d5a29",
      color: "#fe2d5a",
    },
    {
      status: "shipped",
      bg: "#feb70126",
      color: "#feb701",
    },
    {
      status: "delivered",
      bg: "#00a86b26",
      color: "#00A86B",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [orderList, setOrderList] = useState([]);
  const { orders } = useSelector((state) => state.orderState);
  const { user } = useSelector((state) => state.authState);
  useEffect(() => {
    const payload = {
      user_id: user?._id,
    };
    dispatch(getOrders(payload));
  }, []);
  useEffect(() => {
    setOrderList(orders);
  }, [orders]);
  return (
    <div className="order-list">
      <div className="order-list-heading">Order List</div>
      <div className="order-list-container">
        <div>
          <div className="order-list-tabs">
            {tabs.map((tab) => {
              return (
                <div
                  className={`tab cursor-pointer ${
                    selectedTab === tab ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </div>
              );
            })}
          </div>
          <div className="order-list-content">
            {orderList.map((order) => {
              const getOrderStatusValue = () => {
                return (
                  order_status_values.find(
                    (value) => value?.status === order?.order_status
                  ) || {}
                );
              };
              return (
                <div className="order">
                  <div className="header">
                    <div className="res-header d-flex align-items-center justify-content-space-between">
                      <div className="d-flex align-items-center gap-2">
                        <div className="order-id-label">Order ID:</div>
                        <div className="order-id-content">{order?._id}</div>
                      </div>
                      <div
                        className="order-status-value"
                        style={{
                          background: getOrderStatusValue()?.bg,
                          color: getOrderStatusValue()?.color,
                        }}
                      >
                        <div>{order?.order_status}</div>
                      </div>
                    </div>
                  </div>
                  <div className="order-items-content">
                    {order?.order_items?.map((order_item, index) => {
                      return (
                        <div
                          className={`order-item ${
                            index < order?.order_items?.length - 1 ? "" : "end"
                          }`}
                        >
                          <div className="d-flex gap-3 w-fill">
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
                            <div className="product-info cursor-pointer w-fill">
                              <div
                                className="font-size-1-h font-weight-1"
                                style={{ color: "gray" }}
                              >
                                {order_item?.product_type}Hoody {order_item?.product_type}Men
                              </div>
                              <div
                                className="product-title"
                                onClick={() =>
                                  navigate(
                                    `${LOCKED_CLOTH_PAGE}?type=men&product_id=${order_item?.product_id}`
                                  )
                                }
                              >
                                {order_item?.product_title}
                              </div>
                              <div className="d-flex justify-content-flex-end w-fill gap-3 product-price-details mt-2 mb-2">
                                <div className="d-flex align-items-center gap-2 product-price-qty">
                                  <div>{order_item?.selected_quantity}</div>
                                  <RxCross2 />
                                  <div className="d-flex align-items-center">
                                    <PiCurrencyInrBold />
                                    <div>
                                      {getCurrencyFormat(
                                        order_item?.fixed_price
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center price">
                                  <PiCurrencyInrBold />
                                  <div>
                                    {getCurrencyFormat(
                                      order_item?.selected_quantity *
                                        order_item?.fixed_price
                                    )}
                                  </div>
                                </div>
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
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="details-btn-container">
                    <button
                      onClick={() =>
                        navigate(`${ORDER_STATUS_PAGE}?order_id=${order?._id}`)
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
            {orderList?.length === 0 && (
              <div className="order-list-emtpy d-flex align-items-center justify-content-center">
                <div>NO ORDERS FOUND</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
