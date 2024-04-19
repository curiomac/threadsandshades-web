import React, { useState } from "react";
import { IoCloseOutline, IoSearchSharp } from "react-icons/io5";

const OrderAddress = () => {
  const [activeTab, setActiveTab] = useState("billing");
  const [editAddress, setEditAddress] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const getTransformValue = () => {
    return activeTab === "billing" ? "translateX(-1%)" : "translateX(1%)";
  };

  return (
    <div className="order-list order-address">
      <div className="order-list-heading">Order Address</div>
      <div className="order-list-container">
        <div className="order-list-tabs"></div>
        <div className="order-list-content">
          <div className="tabs">
            <button
              className={activeTab === "billing" ? "active" : ""}
              onClick={() => handleTabClick("billing")}
              style={{ transform: getTransformValue() }}
            >
              Billing Address
            </button>
            <button
              className={activeTab === "shipping" ? "active" : ""}
              onClick={() => handleTabClick("shipping")}
              style={{ transform: getTransformValue() }}
            >
              Shipping Address
            </button>
          </div>
          {/* Search */}
          <div class="search-container">
            <div>
              <input
                type="text"
                placeholder="Search the Address here"
                //   onChange={handleProductSearch}
              />
              <IoSearchSharp class="bi bi-search" />
            </div>
            <button onClick={() => setEditAddress(true)}>+ Add Address</button>
          </div>
          {/* <div className="tab-content">
        {activeTab === "billing" && (
          <div>
            <input type="text" placeholder="Billing address" />
          </div>
        )}
        {activeTab === "shipping" && (
          <div>
            <input type="text" placeholder="Shipping address" />
          </div>
        )}
      </div> */}

          <div className="order">
            <div className="order-card-container">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: "rgba(215, 214, 214, 0.582)",
                    borderRadius: "50px",
                    padding: "0px 10px",
                    marginTop: "10px",
                  }}
                >
                  Home
                </div>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                  style={{ accentColor: "#131d39" }}
                />
              </div>
              <div
                style={{ fontWeight: 600, marginTop: "6px" }}
                className="letter-spacing"
              >
                Radhika
              </div>
              <div
                style={{ fontWeight: 600, marginTop: "2px", fontSize: "14px" }}
                className="letter-spacing"
              >
                999999999
              </div>
              <div className="address letter-spacing">
                No 11/4 pillayar koil street,Vadapalani,Chennai-600026
              </div>
              <div className="edit-delete-button-container">
                <button>Edit Address</button>
                <button>Delete Address</button>
              </div>
            </div>
            <div className="order-card-container end">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: "rgba(215, 214, 214, 0.582)",
                    borderRadius: "50px",
                    padding: "0px 10px",
                    marginTop: "10px",
                  }}
                >
                  Home
                </div>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                  style={{ accentColor: "#131d39" }}
                />
              </div>
              <div
                style={{ fontWeight: 600, marginTop: "6px" }}
                className="letter-spacing"
              >
                Radhika
              </div>
              <div
                style={{ fontWeight: 600, marginTop: "2px", fontSize: "14px" }}
                className="letter-spacing"
              >
                999999999
              </div>
              <div className="address letter-spacing">
                No 11/4 pillayar koil street,Vadapalani,Chennai-600026
              </div>
              <div className="edit-delete-button-container">
                <button>Edit Address</button>
                <button>Delete Address</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editAddress && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <div className="modal-content">
              <div className="heading-flex">
                <div className="modal-heading">
                  <div className="new-transaction" style={{fontSize:"14px",letterSpacing:"normal",fontWeight:'bold'}}>Edit Address </div>
                </div>
                <IoCloseOutline
                  onClick={() => setEditAddress(false)}
                  className="close-icon"
                />
              </div>
              <div className="border-bottom"></div>
              <div style={{padding:"20px"}}>
                <div style={{fontSize:"12px",letterSpacing:"normal"}}>Address Label</div>
                <select name="cars" id="cars" className="house-dropdown">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              <div className="full-name-flex">
                <div className="flex-input">
                    <div  style={{fontSize:"12px",letterSpacing:"normal"}}>Full Name*</div>
                    <input placeholder="Full Name"/>
                </div>
                <div className="flex-input">
                    <div  style={{fontSize:"12px",letterSpacing:"normal"}}>Mobile Number*</div>
                    <input placeholder="Mobile Number"/>
                </div>

              </div>
              <div className="address-input-title">
                    <div  style={{fontSize:"12px",letterSpacing:"normal"}}>Address Line*</div>
                    <input placeholder="Address"  className="address-input"/>
                </div>
                <div className="full-name-flex">
                <div className="flex-input">
                    <div  style={{fontSize:"12px",letterSpacing:"normal"}}>City*</div>
                    <input placeholder="City"/>
                </div>
                <div className="flex-input">
                    <div  style={{fontSize:"12px",letterSpacing:"normal"}}>Pincode*</div>
                    <input placeholder="Pincode"/>
                </div>

              </div>
              <div className="country-state-flex">
                <div>
                <div style={{fontSize:"12px",letterSpacing:"normal"}}>Country*</div>
              <select name="cars" id="cars" className="house-dropdown">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
<div>
                <div style={{fontSize:"12px",letterSpacing:"normal"}}>State*</div>

                <select name="cars" id="cars" className="house-dropdown">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                </div>
              </div>
                <div className="button-flex">
<button className="cancel-btn">Cancel</button>
<button className="save-btn">Save Changes</button>
              </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAddress;
