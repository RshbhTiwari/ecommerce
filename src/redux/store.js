import{configureStore} from'@reduxjs/toolkit'
import category from './slices/category';
import product from './slices/product';
import loginRegister from './slices/loginRegister';

const store= configureStore({
    reducer:{
        category:category,
        product:product,
        loginRegister: loginRegister,
    },
})

export const { dispatch } = store;

export default store;
