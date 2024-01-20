import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveWishList } from "../../../../../redux/actions/wishListAction";

const CartItems = () => {
  const { cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch()
  const handleMoveToWishList = (cartItem) => {
    const payload = {
      product_id: cartItem._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      is_from: 'cart'
    };
    dispatch(moveWishList(payload));
  };
  return (
    <div className="cart-items">
      <div>
        <div className="cart-items-container">
          {cartItems?.map((cartItem) => {
            return (
              <div className="cart-item-content">
                <div className="cart-item">
                  <div className="cart-item-img">
                    <img src={cartItem.images[0].image} alt={cartItem._id} />
                  </div>
                  <div>
                    <div className="title">{cartItem.title}</div>
                    <div className="price">
                      <div className="discount-price">
                        ₹{parseInt(cartItem.price) - 100}
                      </div>
                      <div className="original-price">₹{cartItem.price}</div>
                      <div className="discount">(60% Off)</div>
                    </div>
                    <div className="custom-hr mt-2 mb-2"></div>
                    <div className="product-features">
                        <div className="color-container">
                            <div className="color-heading">Color:</div>
                            <div className="color-code">Black</div>
                        </div>
                        <div className="size-container">
                            <div className="size-heading">Size:</div>
                            <div className="size-code">L</div>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="custom-hr mt-2 mb-2"></div>
                <div className="d-flex cart-actions">
                  <div className="remove">Remove</div>
                  <div className="wishlist" onClick={() => handleMoveToWishList(cartItem)}>Move to Wishlist</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
