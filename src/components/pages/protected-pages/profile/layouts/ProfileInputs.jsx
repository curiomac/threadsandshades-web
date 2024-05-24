import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../../redux/actions/userActions";

const ProfileInputs = () => {
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [alternateMobileNo, setAlternateMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const handleProfileSave = (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNo,
      alternate_mobile_number: alternateMobileNo,
      email: email,
      gender: gender,
      date_of_birth: dateOfBirth,
    };
    const user_id = user?._id;
    dispatch(updateProfile(user_id, payload));
  };
  useEffect(() => {
    if (user) {
      setFirstName(user?.first_name);
      setLastName(user?.last_name);
      setMobileNo(user?.mobile_number);
      setAlternateMobileNo(user?.alternate_mobile_number);
      setEmail(user?.email);
      setGender(user?.gender);
      setDateOfBirth(new Date(user?.date_of_birth));
    }
  }, [user]);
  return (
    <div className="profile-inputs">
      <div className="profile-heading">Account Details</div>
      <div className="profile-container">
        <div className="profile-box">
          <form className="input-container">
            <div className="full-name">
              <input
                // type="text"
                value={firstName}
                placeholder="First Name"
                className="name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                // type="text"
                value={lastName}
                placeholder="Last Name"
                className="name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              style={{ marginTop: "15px" }}
              type="number"
              value={mobileNo}
              placeholder="Mobile Number"
              className="name-input"
              onChange={(e) => setMobileNo(e.target.value)}
            />
            <input
              style={{ marginTop: "15px" }}
              type="number"
              value={alternateMobileNo}
              placeholder="Alternate Mobile Number"
              className="name-input"
              onChange={(e) => setAlternateMobileNo(e.target.value)}
            />

            <input
              value={email}
              style={{ marginTop: "15px" }}
              type="email"
              placeholder="Email"
              className="name-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="gender">
              <button
                type="button"
                className={`male-btn ${gender === "MALE" && "active"}`}
                onClick={() => setGender("MALE")}
              >
                Male
              </button>
              <button
                type="button"
                className={`female-btn ${gender === "FEMALE" && "active"}`}
                onClick={() => setGender("FEMALE")}
              >
                Female
              </button>
            </div>
            <input
              style={{ marginTop: "15px" }}
              value={dateOfBirth}
              type="date"
              className="name-input"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <div className="save-button">
              <button onClick={handleProfileSave}>Save Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInputs;
