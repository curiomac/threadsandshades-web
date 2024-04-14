export const endpoints = {
  otp: {
    post: "otp/send",
  },
  user: {
    login: "login",
    register: "register",
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
  ratings: {
    get: "ratings/get",
  },
  rating: {
    create: "rating/create",
  },
  products: {
    get: "products",
  },
  product: {
    get: "product",
  },
  cart: {
    get: "cart",
    temp_get: "temp/cart",
    add: "cart/add",
    update: "cart/update",
    remove: "cart/remove",
  },
  checkout_details: {
    get: "checkoutdetails",
    temp_get: "temp/checkoutdetails",
  },
  wish_list: {
    get: "wishlist",
    move: "wishlist/move",
  },
  address: {
    getPostalAddress: "postaladdress/get"
  },
  order: {
    create: "order/create",
    get: "order"
  },
  orders: {
    get: "orders"
  }
};
