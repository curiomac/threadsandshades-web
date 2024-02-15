export const endpoints = {
    login: {
        post: 'login'
    },
    theme: {
        get: 'theme/get'
    },
    products: {
        get: 'products'
    },
    product: {
        get: 'product'
    },
    cart: {
        get: 'cart',
        add: 'cart/add',
        remove: 'cart/remove'
    },
    checkout_details: {
        get: 'checkoutdetails',
    },
    wish_list: {
        get: 'wishlist',
        move: 'wishlist/move'
    }
}