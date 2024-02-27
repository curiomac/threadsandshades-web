export const endpoints = {
  otp: {
    post: "otp/send",
  },
  login: {
    post: "login",
  },
  register: {
    post: "register",
  },
  profile: {
    get: "/profile/get",
    get_image: "/profile/image/get",
    update: "/profile/update",
    update_image: "/profile/image/update",
  },
  theme: {
    get: "theme/get",
  },
  products: {
    get: "products",
  },
  product: {
    get: "product",
  },
  cart: {
    get: "cart",
    add: "cart/add",
    remove: "cart/remove",
  },
  checkout_details: {
    get: "checkoutdetails",
  },
  wish_list: {
    get: "wishlist",
    move: "wishlist/move",
  },
};
