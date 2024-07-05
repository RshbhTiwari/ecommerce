import{configureStore} from'@reduxjs/toolkit'
import category from './slices/category';
import product from './slices/product';

const store= configureStore({
    reducer:{
        category:category,
        product:product,
    },
})

export const { dispatch } = store;

export default store;
