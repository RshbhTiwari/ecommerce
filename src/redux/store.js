import { configureStore } from '@reduxjs/toolkit'
import category from './slices/category';
import product from './slices/product';
import loginRegister from './slices/loginRegister';
import addToCart from './slices/addToCart';
import address from './slices/address';
import user from './slices/user';
import wishlist from './slices/wishlist';
import initiaterazorpay from './slices/initiaterazorpay';
import contact from './slices/contactfrom';
import blog from './slices/blog';
import orders from './slices/orders';
import codorder from './slices/codorder';

const store = configureStore({
    reducer: {
        category: category,
        product: product,
        loginRegister: loginRegister,
        addToCart: addToCart,
        address: address,
        user: user,
        wishlist: wishlist,
        initiaterazorpay: initiaterazorpay,
        contact: contact,
        blog: blog,
        orders: orders,
        codorder:codorder,
    },
})

export const { dispatch } = store;

export default store;
