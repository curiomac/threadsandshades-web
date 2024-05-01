import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { RxSlash } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import empty_profile_img from "../../../../../assets/imgs/profile/profile-empty.jpg";
import { IoIosArrowDown } from "react-icons/io";

const ProductReviews = ({ ratings }) => {
    const [height, setHeight] = useState(200);
    const [loadComments, setLoadComments] = useState(false);
    const ratingsValue = [27, 5, 3, 0, 5];
    const percentages = ratingsValue.map((count) => `${(count / 41) * 100}%`);
    const percentagesValue = ratingsValue.map((count) => (count / 41) * 100);
    useEffect(() => {
      if (height > 800) {
        setHeight(800);
      }
    }, [height]);
  return (
    <div
      className={`comments-container product-review ${height === 800 ? "full-load" : ""} ${
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
                  <div className="user-name">{review?.user?.first_name}</div>
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
                    ratings.length > index + 1 ? "end" : ""
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
