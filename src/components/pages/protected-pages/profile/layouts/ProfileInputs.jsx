import React from "react";

const ProfileInputs = () => {
  return (
    <div className="profile-inputs">
      <div className="profile-heading">Account Details</div>
      <div className="profile-container">
        <div className="profile-box">
          <div className="input-container">
            <div className="full-name">
              <input type="text" placeholder=" First Name" className="name" />
              <input type="text" placeholder=" Last Name" className="name" />
            </div>

            <input
              style={{ marginTop: "15px" }}
              type="number"
              placeholder=" Mobile Number"
              className="name-input"
            />
            <input
              style={{ marginTop: "15px" }}
              type="number"
              placeholder=" Alternate Mobile Number"
              className="name-input"
            />

            <input
              style={{ marginTop: "15px" }}
              type="email"
              placeholder=" Email"
              className="name-input"
            />
            <div className="gender">
              <button className="male-btn active">Male</button>
              <button className="female-btn">Female</button>
            </div>
            <input
              style={{ marginTop: "15px" }}
              type="text"
              placeholder=" Birthday (dd/mm/yyyy)"
              className="name-input"
            />
            <div className="save-button">
              <button type="submit">Save Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInputs;