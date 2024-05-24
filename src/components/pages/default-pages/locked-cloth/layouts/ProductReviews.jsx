import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { RxSlash } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import empty_profile_img from "../../../../../assets/imgs/profile/profile-empty.jpg";
import { IoIosArrowDown } from "react-icons/io";
import ReactCountryFlag from "react-country-flag";

const ProductReviews = ({ ratings }) => {
  const [height, setHeight] = useState(200);
  const [loadComments, setLoadComments] = useState(false);
  return (
    <div
      className={`comments-container product-review ${
        ratings?.reviews?.length > 0 ? "list" : ""
      }`}
    >
              <div className="heading-product w-fit-content">
          <div>Customer Reviews</div>
          <div className="drop-border"></div>
        </div>
      {ratings?.reviews?.map((review, index) => {
        return (
          <div className="comment">
            <div>
              <div className="d-flex align-items-center justify-content-space-between comment-info">
                <div className="user-info">
                  <div className="profile-img">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.user_id} />
                    ) : (
                      <img src={empty_profile_img} alt={review.user_id} />
                    )}
                  </div>
                  <div className="user-name font-weight-1">
                    <div>
                      <span style={{ fontSize: "14px" }}>
                        {review?.first_name ? review?.first_name : `user-${review?.user_id}`}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "#c45500", fontWeight: "400" }}>
                        [Verified Purchase], {" "}
                      </span>
                      <span style={{ color: "#000", fontWeight: "400" }}>
                        review from India <ReactCountryFlag countryCode="IN" svg />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`comment-container ${
                  ratings.length > index + 1 ? "end" : ""
                }`}
              >
                <div className="d-flex align-items-center gap-2 font-weight-1" style={{marginTop: '-5px'}}>
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
                <div className="heading" style={{ marginTop: "10px", marginBottom: "4px", fontWeight: '600' }}>
                  {review?.review_title}
                </div>
                <div className="comment">{review?.product_review}</div>
              </div>
            </div>
            <div
              style={{
                height: "1px",
                backgroundColor: "#8080802b",
                marginBottom: "20px",
              }}
            />
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
    </div>
  );
};

export default ProductReviews;
