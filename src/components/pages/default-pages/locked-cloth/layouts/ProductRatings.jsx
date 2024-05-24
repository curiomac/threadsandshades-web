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
  const ratingsValue = [
    ratings?.ratings_counts_by_star?.star_5,
    ratings?.ratings_counts_by_star?.star_4,
    ratings?.ratings_counts_by_star?.star_3,
    ratings?.ratings_counts_by_star?.star_2,
    ratings?.ratings_counts_by_star?.star_1,
  ];
  const percentages = ratingsValue.map((count) => `${(count / ratings?.ratings_count) * 100}%`);
  const percentagesValue = ratingsValue.map((count) => (count / ratings?.ratings_count) * 100);
  useEffect(() => {
    if (height > 800) {
      setHeight(800);
    }
  }, [height]);
  return (
    <div className="product-ratings mt-3">
      <div className="product-ratings-contents">
        <div className="heading-product w-fit-content">
          <div>Product Ratings</div>
          <div className="drop-border"></div>
        </div>
        <div className="product-ratings-container">
          <div className="reviews-calc">
            <div className="reviews-calc-content">
              <div className="current">{ratings?.total_ratings}</div>
              <div className="ic-slash">
                <RxSlash />
              </div>
              <div className="target">5</div>
            </div>
            <div className="reviews-count">({ratings?.ratings_count} Reviews)</div>
          </div>
          <div className="product-rating-bar-container">
            <div className="rating-bar">
              {ratingsValue.map((rating, index) => {
                return (
                  <div className="mt-2">
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
                      <div style={{width: '0'}}>
                        <div>0+</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div
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
          {(ratings?.reviews?.length === undefined ||
            ratings?.reviews?.length === 0) && (
            <div
              style={{
                height: height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#bdbdbd",
              }}
            >
              <div className="font-20 text-transform-uc font-weight-1">
                No Ratings Found
              </div>
            </div>
          )}
        </div> */}
        {/* {height < 800 && ratings?.reviews?.length > 0 && (
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
        )} */}
      </div>
    </div>
  );
};

export default ProductRatings;
