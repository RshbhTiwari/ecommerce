import{configureStore} from'@reduxjs/toolkit'
import category from './slices/category';
import product from './slices/product';
import loginRegister from './slices/loginRegister';
import addToCart from './slices/addToCart';

const store= configureStore({
    reducer:{
        category:category,
        product:product,
        loginRegister: loginRegister,
        addToCart:addToCart,
    },
})

export const { dispatch } = store;

export default store;
