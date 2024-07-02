import{configureStore} from'@reduxjs/toolkit'
import category from './slices/category';

const store= configureStore({
    reducer:{
        category:category
    },
})

export const { dispatch } = store;

export default store;
