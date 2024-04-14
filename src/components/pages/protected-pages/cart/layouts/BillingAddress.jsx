import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import { getPostalAddress } from "../../../../../redux/actions/addressAction";
import CustomDropdown from "../../../../plugins/custom-dropdown/CustomDropdown";
import { postalAddressClear } from "../../../../../redux/slices/addressSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createOrder } from "../../../../../redux/actions/orderAction";
import { ORDER_STATUS_PAGE } from "../../../../../helpers/route-paths/paths";
import { clearCode } from "../../../../../redux/slices/orderSlice";
import { PiCurrencyInrBold } from "react-icons/pi";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const BillingAddress = () => {
  const dispatch = useDispatch();
  const trigger = getQueryParam("proceed");
  const [triggerPlaceOrder] = useOutletContext();
  const { proceed } = useSelector((state) => state.resCartState);
  const { order, code } = useSelector((state) => state.orderState);
  const { postalAddress } = useSelector((state) => state.addressState);
  const { cartItems, loading: cartItemsLoading } = useSelector(
    (state) => state.cartState
  );
  const {
    checkoutDetails,
    loading: checkoutDetailsLoading,
    error: checkoutDetailsError,
  } = useSelector((state) => state.checkoutDetailsState);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authState);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [alternateMobileNo, setAlternateMobileNo] = useState("");
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [locationSelectedOption, setLocationSelectedOption] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [alternateMobileNoError, setAlternateMobileNoError] = useState("");
  const [stateError, setStateError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [locationSelectedOptionError, setLocationSelectedOptionError] =
    useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [showCartItems, setShowCartItems] = useState(false);
  const handlePostalAddress = (e) => {
    const postal_code = e?.target?.value;
    if (postal_code.length > 0) {
      setPostalCodeError("");
    }
    setPostalCode(postal_code);
    const payload = {
      postal_code,
    };
    dispatch(getPostalAddress(payload));
  };
  const handleLocationSelect = (e) => {
    if (e) {
      setLocationSelectedOptionError("");
    }
    setLocationSelectedOption(e);
  };
  const handleErrorMsg = () => {
    let isValid = true;
    let mobile_number_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!firstName) {
      setFirstNameError("Please enter your first name");
      isValid = false;
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      setLastNameError("Please enter your last name");
      isValid = false;
    } else {
      setLastNameError("");
    }
    if (!mobileNo) {
      setMobileNoError("Please enter your mobile number");
      isValid = false;
    } else if (!mobile_number_regex.test(mobileNo)) {
      setMobileNoError("Please enter a valid mobile number");
      isValid = false;
    } else {
      setMobileNoError("");
    }
    if (!email) {
      setEmailError("Please enter your email");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!address) {
      setAddressError("Please enter your address");
      isValid = false;
    } else {
      setAddressError("");
    }
    // if (!state) {
    //   setStateError("Please enter your first name");
    //   isValid = false;
    // } else {
    //   setStateError("");
    // }
    // if (!district) {
    //   setDistrictError("Please enter your first name");
    //   isValid = false;
    // } else {
    //   setDistrictError("");
    // }
    if (!locationSelectedOption) {
      setLocationSelectedOptionError("Please select your location");
      isValid = false;
    } else {
      setLocationSelectedOptionError("");
    }
    if (!postalAddress) {
      setPostalCodeError("Please enter your postal code");
      isValid = false;
    } else {
      setPostalCodeError("");
    }
    return isValid;
  };
  const handlePlaceOrder = () => {
    const isValid = handleErrorMsg();
    if (isValid) {
      const getProductIds = () => {
        return cartItems.map((cart_item) => {
          console.log("cart_sitem: ", cart_item)
          const product_id = cart_item?.product?._id;
          return {
            product_id,
            ...cart_item.selected_product_details,
          };
        });
      };
      const payload = {
        user_id: user?._id,
        product_ids: getProductIds(),
        payment_method: "COD",
        billing_address: {
          first_name: firstName,
          last_name: lastName,
          mobile_no: mobileNo,
          email: email,
          address: address,
          alternate_address: alternateMobileNo,
          state: state,
          district: district,
          location: locationSelectedOption,
          postal_code: postalCode,
          act_shipping_address: true,
        },
        order_summary: {
          total_mrp: checkoutDetails.total_mrp,
          shipping_charge:
            checkoutDetails?.discounted_delivery_charge === 0
              ? checkoutDetails?.discounted_delivery_charge
              : checkoutDetails?.shipping_charge,
          cart_total: checkoutDetails.cart_total,
        },
      };
      dispatch(createOrder(payload));
    }
  };
  useEffect(() => {
    if (triggerPlaceOrder === true) {
      const isValid = handleErrorMsg();
      if (isValid) {
        const getProducts = () => {
          return cartItems.map((cart_item) => {
            console.log("cart_sitem: ", cart_item)
            const product_id = cart_item?.product?._id;
            return {
              product_id,
              ...cart_item.selected_product_details,
            };
          });
        };
        const payload = {
          user_id: user?._id,
          products: getProducts(),
          payment_method: "COD",
          billing_address: {
            first_name: firstName,
            last_name: lastName,
            mobile_no: mobileNo,
            email: email,
            address: address,
            alternate_address: alternateMobileNo,
            state: state,
            district: district,
            location: locationSelectedOption,
            postal_code: postalCode,
            act_shipping_address: true,
          },
          order_summary: {
            total_mrp: checkoutDetails.total_mrp,
            shipping_charge:
              checkoutDetails?.discounted_delivery_charge === 0
                ? checkoutDetails?.discounted_delivery_charge
                : checkoutDetails?.shipping_charge,
            cart_total: checkoutDetails.cart_total,
          },
        };
        dispatch(createOrder(payload));
      }
    }
  }, [triggerPlaceOrder]);
  useEffect(() => {
    if (code === "order-creation-successfull" && order?._id) {
      navigate(`${ORDER_STATUS_PAGE}?order_id=${order?._id}`);
      dispatch(clearCode());
    }
  }, [code]);
  useEffect(() => {
    setState(
      postalAddress?.PostOffice?.length > 0
        ? postalAddress?.PostOffice[0]?.State
        : ""
    );
    setDistrict(
      postalAddress?.PostOffice?.length > 0
        ? postalAddress?.PostOffice[0]?.District
        : ""
    );
  }, [postalAddress]);
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div
      className={`cart-items ${
        proceed === "true" ? "hide-cart-items" : "show-cart-items"
      }`}
    >
      <div className="billing-address-container">
        <div className="billing-address">
          <div className="billing-address-content">
            <div className="billing-address-heading">Billing Address</div>
            <div className="billing-inputs">
              <div className="flex-inputs d-flex align-items-center gap-3 w-fill">
                <div className="w-fill">
                  <div className="label">
                    First Name <span className="manditory">*</span>
                  </div>
                  <input
                    className={`${firstNameError ? "active" : ""}`}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (e.target.value.length > 0) {
                        setFirstNameError("");
                      }
                      // handleErrorMsg();
                    }}
                  />
                  <div className="input-msg">{firstNameError}</div>
                </div>
                <div className="w-fill">
                  <div className="label">
                    Last Name <span className="manditory">*</span>
                  </div>
                  <input
                    className={`${lastNameError ? "active" : ""}`}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (e.target.value.length > 0) {
                        setLastNameError("");
                      }
                    }}
                  />
                  <div className="input-msg">{lastNameError}</div>
                </div>
              </div>
              <div className="flex-inputs d-flex align-items-center gap-3 w-fill">
                <div className="w-fill">
                  <div className="label">
                    Mobile Number <span className="manditory">*</span>
                  </div>
                  <input
                    className={`${mobileNoError ? "active" : ""}`}
                    placeholder="Mobile Number"
                    value={mobileNo}
                    onChange={(e) => {
                      let mobile_number_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
                      setMobileNo(e.target.value);
                      if (
                        mobileNoError &&
                        !mobile_number_regex.test(mobileNo)
                      ) {
                        setMobileNoError("Please enter a valid mobile number");
                      } else if (e.target.value.length > 0) {
                        setMobileNoError("");
                      }
                    }}
                    type="number"
                  />
                  <div className="input-msg">{mobileNoError}</div>
                </div>
                <div className="w-fill">
                  <div className="label">
                    Alternate Mobile Number (Optional)
                  </div>
                  <input
                    className={`${alternateMobileNoError ? "active" : ""}`}
                    placeholder="Alternate Mobile Number (Optional)"
                    value={alternateMobileNo}
                    onChange={(e) => {
                      setAlternateMobileNo(e.target.value);
                      if (e.target.value.length > 0) {
                        setAlternateMobileNoError("");
                      }
                    }}
                    type="number"
                  />
                  <div className="input-msg">{alternateMobileNoError}</div>
                </div>
              </div>
              <div>
                <div className="label">
                  Email <span className="manditory">*</span>
                </div>
                <input
                  className={`${emailError ? "active" : ""}`}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.length > 0) {
                      setEmailError("");
                    }
                  }}
                  type="email"
                />
                <div className="input-msg">{emailError}</div>
              </div>
              <div>
                <div className="label">
                  Address <span className="manditory">*</span>
                </div>
                <input
                  className={`${addressError ? "active" : ""}`}
                  placeholder="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value.length > 0) {
                      setAddressError("");
                    }
                  }}
                />
                <div className="input-msg">{addressError}</div>
              </div>

              <div className="flex-inputs d-flex align-items-center gap-3 w-fill">
                <div className="w-fill">
                  <div className="label">
                    Postal Code <span className="manditory">*</span>
                  </div>
                  <input
                    className={`${postalCodeError ? "active" : ""}`}
                    value={postalCode}
                    onChange={handlePostalAddress}
                    placeholder="Postal Code"
                    type="number"
                  />
                  <div className="input-msg">{postalCodeError}</div>
                </div>
                <div className="w-fill">
                  <div className="label">State</div>
                  <input
                    className={`${stateError ? "active" : ""}`}
                    disabled
                    value={state}
                    placeholder="State"
                  />
                  <div className="input-msg">{stateError}</div>
                </div>
              </div>
              <div className="flex-inputs d-flex align-items-center gap-3 w-fill">
                <div className="w-fill">
                  <div className="label">District</div>
                  <input
                    className={`${districtError ? "active" : ""}`}
                    placeholder="District"
                    disabled
                    value={district}
                  />
                  <div className="input-msg">{districtError}</div>
                </div>
                <div className="w-fill">
                  <div className="label">
                    Location <span className="manditory">*</span>
                  </div>
                  <CustomDropdown
                    value={locationSelectedOption}
                    placeholder={"Location"}
                    onSelect={handleLocationSelect}
                    options={postalAddress?.PostOffice}
                    optionTarget={"Name"}
                    className={`${locationSelectedOptionError ? "active" : ""}`}
                  />
                  <div className="input-msg">{locationSelectedOptionError}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment">
          <div className="payment-content">
            <div className="payment-heading">Payment</div>
            <div className="payment-types-container">
              <div className="payment-types w-fill">
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" disabled />
                  <div className="payment-type">Credit Card</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" disabled />
                  <div className="payment-type">Debit Card</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" disabled />
                  <div className="payment-type">UPI</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" checked="true" />
                  <div className="payment-type">Pay on Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="place-order-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-fill">
          <div className={`d-flex justify-content-space-between`}>
            <div className="total-items-heading">
              Total Items ({cartItems?.length})
            </div>
            <div
              className="d-flex"
              onClick={() => setShowCartItems(!showCartItems)}
            >
              {showCartItems ? (
                <MdOutlineKeyboardDoubleArrowDown />
              ) : (
                <MdOutlineKeyboardDoubleArrowUp />
              )}
            </div>
          </div>
          <div className={`total-cart-items ${showCartItems ? "show" : ""}`}>
            <div className="checkout-cart-items">
              {cartItems?.map((cartItem) => {
                console.log("cartItem:", cartItem);
                return (
                  <div className="checkout-cart-item">
                    <div className="d-flex gap-3">
                      <div className="img-box">
                        <div className="item-qty-container">
                          <div className="item-qty">
                            {
                              cartItem?.selected_product_details
                                ?.selected_quantity
                            }
                          </div>
                        </div>
                        <img
                          src={
                            cartItem?.product?.product_images?.length > 0 &&
                            cartItem?.product?.product_images[0]
                          }
                          alt={cartItem?.product?._id}
                        />
                      </div>
                      <div className="item-info">
                        <div className="item-title">
                          {cartItem?.product?.product_title}
                        </div>
                        <div className="item-features">
                          <div className="item-size">
                            {cartItem?.selected_product_details?.selected_size}
                          </div>
                          <div className="custom-vr" />
                          <div
                            className="item-target-color"
                            style={{
                              background:
                                cartItem?.selected_product_details
                                  ?.selected_color_code,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center price">
                      <div className="d-flex align-items-center">
                        <PiCurrencyInrBold />
                      </div>
                      <div>{cartItem?.product?.fixed_price}.00</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="sec-custom-hr" />
          </div>
          <button
            className="place-order-btn d-flex align-items-center mt-2 gap-2 justify-content-center cursor-pointer"
            onClick={handlePlaceOrder}
          >
            <div>
              <BsBoxSeamFill className="font-size-3 d-flex align-items-center" />
            </div>
            <div>PLACE ORDER</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
