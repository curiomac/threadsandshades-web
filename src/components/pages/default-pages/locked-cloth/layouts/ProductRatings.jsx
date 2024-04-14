import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { RxSlash } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import empty_profile_img from "../../../../../assets/imgs/profile/profile-empty.jpg";
import { IoIosArrowDown } from "react-icons/io";

const ProductRatings = ({ ratings }) => {
  const [height, setHeight] = useState(200);
  const [loadComments, setLoadComments] = useState(false);
  const ratingsValue = [27, 5, 3, 0, 5];
  const percentages = ratingsValue.map((count) => `${(count / 41) * 100}%`);
  const percentagesValue = ratingsValue.map((count) => (count / 41) * 100);
  const demo_msgs = [
    {
      id: 1,
      username: "NightOwl23",
      rating: 5,
      heading: "Comfortable and Stylish",
      comment:
        "Absolutely love this hoodie! It's so comfortable and stylish. Perfect for cool evenings.",
      date: "2024-03-15",
    },
    {
      id: 2,
      username: "SneakerHead87",
      rating: 4,
      heading: "Nice Design, a Bit Pricey",
      comment:
        "Nice design and quality, but a bit pricey. Still worth it for the style.",
      date: "2024-03-18",
    },
    {
      id: 3,
      username: "FitnessFreak55",
      rating: 5,
      heading: "Great for Workouts",
      comment:
        "Great for workouts or casual wear. Breathable fabric and looks cool!",
      date: "2024-03-20",
    },
    {
      id: 4,
      username: "Fashionista99",
      rating: 3,
      heading: "Good Look, Sizing Issue",
      comment:
        "The hoodie looks good, but the fit is a bit off for me. Maybe try a size up.",
      date: "2024-03-22",
    },
    {
      id: 5,
      username: "NightSkyWatcher",
      rating: 5,
      heading: "Cozy and Stylish",
      comment: "Love the dark theme! Feels cozy and stylish at the same time.",
      date: "2024-03-25",
    },
  ];
  useEffect(() => {
    if (height > 800) {
      setHeight(800);
    }
  }, [height]);
  return (
    <div className="product-ratings mt-3">
      <div className="product-ratings-contents">
        <div className="heading">Product Ratings</div>
        <div className="product-ratings-container">
          <div className="reviews-calc">
            <div className="reviews-calc-content">
              <div className="current">4.9</div>
              <div className="ic-slash">
                <RxSlash />
              </div>
              <div className="target">5</div>
            </div>
            <div className="reviews-count">(41 Reviews)</div>
          </div>
          <div className="product-rating-bar-container">
            <div className="rating-bar">
              {ratingsValue.map((rating, index) => {
                return (
                  <div>
                    <div className="d-flex align-items-center gap-1">
                      <div className="d-flex align-items-center gap-1 rating-for">
                        <div className="d-flex align-items-center ic-star">
                          <IoIosStar className="ic" />
                        </div>
                        <div className="font-weight-1 text-align-center rating-star">
                          {ratingsValue.length - index}
                        </div>
                      </div>
                      <div
                        className={`bar ${
                          percentagesValue[index] <= 10 ? "round-val" : ""
                        }`}
                        style={{ width: percentages[index] || "0%" }}
                      ></div>
                    </div>
                    <div className="bar-dummy">
                      <div className="dummy" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={`comments-container ${height === 800 ? "full-load" : ""} ${
            ratings?.reviews?.length > 0 ? "list" : ""
          }`}
          style={{ height: height }}
        >
          {ratings?.reviews?.map((review, index) => {
            return (
              <div className="comment">
                <div>
                  <div className="d-flex align-items-center justify-content-space-between comment-info">
                    <div className="user-info">
                      <div className="profile-img">
                        <img src={empty_profile_img} alt={review.user_id} />
                      </div>
                      <div className="user-name">
                        {review?.user?.first_name}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 font-weight-1">
                      <div className="d-flex align-items-center ic-star gap-1 font-12">
                        <IoIosStar size={14} color="rgb(254, 170, 2)" />{" "}
                        {review?.rating_value}
                      </div>
                      <div className="d-flex align-items-center ic-dot">
                        <GoDotFill color="#c2c2c2" size={10} />
                      </div>
                      <div className="font-12">
                        {moment(review?.posted_on).format("DD MMM YYYY")}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`comment-container ${
                      demo_msgs.length > index + 1 ? "end" : ""
                    }`}
                  >
                    <div className="heading">{review?.review_title}</div>
                    <div className="comment">{review?.product_review}</div>
                  </div>
                </div>
              </div>
            );
          })}
          {console.log("ratings?.reviews?.length: ", ratings?.reviews?.length)}
          {(ratings?.reviews?.length === undefined ||
            ratings?.reviews?.length === 0) && (
            <div
              style={{
                height: height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#bdbdbd"
              }}
            >
              <div className="font-20 text-transform-uc font-weight-1">No Ratings Found</div>
            </div>
          )}
        </div>
        {height < 800 && ratings?.reviews?.length > 0 && (
          <div className="d-flex align-items-center justify-content-center show-more-comments-container">
            <div>
              <div className="d-flex align-items-center justify-content-center w-fill">
                <div
                  className="d-flex align-items-center justify-content-center ic-arrow"
                  onClick={() => {
                    setLoadComments(true);
                    if (height < 800) {
                      setHeight(height + 500);
                    } else {
                      setHeight(800);
                    }
                  }}
                >
                  <IoIosArrowDown />
                </div>
              </div>
              <div className="text-align-center font-12">Show More</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRatings;
